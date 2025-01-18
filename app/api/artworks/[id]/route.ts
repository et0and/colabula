import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

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

  const existingArtwork = await prisma.artwork.findUnique({
    where: { id },
  });

  if (!existingArtwork) {
    return NextResponse.json({ error: "Artwork not found" }, { status: 404 });
  }

  if (existingArtwork.userId !== sessionData.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await req.formData();

  const title = formData.get("title");
  const content = formData.get("content");
  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 }
    );
  }

  let tags, imageUrls;
  try {
    tags = JSON.parse(formData.get("tags") as string);
    imageUrls = JSON.parse(formData.get("existingImages") as string);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }

  const updatedArtwork = await prisma.artwork.update({
    where: { id },
    data: {
      title: title as string,
      content: content as string,
      tags,
      imageUrls,
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
