import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { artworkId: string } }
) {
  try {
    const { artworkId } = params;
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID not provided" },
        { status: 401 }
      );
    }

    const rating = await prisma.rating.findUnique({
      where: {
        userId_artworkId: {
          userId,
          artworkId,
        },
      },
    });

    return NextResponse.json({ rating });
  } catch (error) {
    console.error("Error fetching rating:", error);
    return NextResponse.json(
      { error: "Failed to fetch rating" },
      { status: 500 }
    );
  }
}
