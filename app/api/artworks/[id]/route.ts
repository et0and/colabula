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

  const updatedArtwork = await prisma.artwork.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tags: JSON.parse(formData.get("tags") as string),
      imageUrls: JSON.parse(formData.get("existingImages") as string),
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
