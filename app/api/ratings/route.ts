import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { artworkId, rating, userId } = await req.json();

    if (!artworkId || rating === undefined || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newRating = await prisma.rating.create({
      data: {
        value: rating,
        artworkId,
        userId,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(newRating);
  } catch (error) {
    console.error("Error creating rating:", error);
    return NextResponse.json(
      { error: "Failed to create rating" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { artworkId, rating, userId } = await req.json();

    if (!artworkId || rating === undefined || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedRating = await prisma.rating.update({
      where: {
        userId_artworkId: {
          userId,
          artworkId,
        },
      },
      data: {
        value: rating,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(updatedRating);
  } catch (error) {
    console.error("Error updating rating:", error);
    return NextResponse.json(
      { error: "Failed to update rating" },
      { status: 500 }
    );
  }
}
