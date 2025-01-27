import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.AWS_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context;
  const id = (await params).id;
  const sessionData = await auth.api.getSession({ headers: req.headers });

  if (!sessionData?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const files = formData.getAll("file") as File[];
  const newImageUrls = [];

  // Process new file uploads
  for (const file of files) {
    const fileName = `${Date.now()}-${file.name}`;
    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
      ACL: "public-read",
    });

    await s3.send(uploadCommand);
    newImageUrls.push(`${process.env.AWS_PUBLIC_ENDPOINT_URL}/${fileName}`);
  }

  // Get existing data
  const title = formData.get("title");
  const content = formData.get("content");
  const existingImages = JSON.parse(formData.get("existingImages") as string);
  const tags = JSON.parse(formData.get("tags") as string);

  // Combine existing and new image URLs
  const combinedImageUrls = [...existingImages, ...newImageUrls];

  const updatedArtwork = await prisma.artwork.update({
    where: { id },
    data: {
      title: title as string,
      content: content as string,
      tags,
      imageUrls: combinedImageUrls,
    },
  });

  return NextResponse.json(updatedArtwork);
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context;

  const artwork = await prisma.artwork.findUnique({
    where: { id: (await params).id },
    include: {
      user: true,
      comments: true,
      ratings: true,
    },
  });

  if (!artwork) {
    return NextResponse.json({ error: "Artwork not found" }, { status: 404 });
  }

  return NextResponse.json(artwork);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context;

  const sessionData = await auth.api.getSession({ headers: req.headers });

  if (!sessionData?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existingArtwork = await prisma.artwork.findUnique({
    where: { id: (await params).id },
  });

  if (!existingArtwork) {
    return NextResponse.json({ error: "Artwork not found" }, { status: 404 });
  }

  if (existingArtwork.userId !== sessionData.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.artwork.delete({ where: { id: (await params).id } });

  return NextResponse.json({ success: true });
}
