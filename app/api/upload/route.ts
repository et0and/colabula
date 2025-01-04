import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";
import { ArtCategory } from "@prisma/client";
import { auth } from "@/lib/auth";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.AWS_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MiB in bytes
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const sessionData = await auth.api.getSession({
    headers: req.headers,
  });

  if (!sessionData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const files = formData.getAll("file") as File[];
  const imageUrls = [];

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return Response.json(
        { error: "Only JPG, PNG and WEBP files are allowed" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: "Individual file size must be less than 50MiB" },
        { status: 400 }
      );
    }

    const fileName = `${Date.now()}-${file.name}`;
    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
      ACL: "public-read",
    });

    await s3.send(uploadCommand);
    imageUrls.push(`${process.env.AWS_PUBLIC_ENDPOINT_URL}/${fileName}`);
  }

  const category = formData.get("category") as ArtCategory;
  const title = formData.get("title") as string;
  const school = formData.get("school") as string;
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((tag) => tag.trim());
  const content = formData.get("content") as string;

  const artwork = await prisma.artwork.create({
    data: {
      title,
      school,
      category,
      imageUrls,
      tags,
      content,
      userId: sessionData.user.id,
    },
  });
  return Response.json({ success: true, artwork });
}
