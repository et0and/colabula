import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ artworkId: string }> }
) {
  const sessionData = await auth.api.getSession({
    headers: req.headers,
  });

  if (!sessionData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { artworkId } = await params;
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
