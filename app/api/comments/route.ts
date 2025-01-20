import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const sessionData = await auth.api.getSession({
    headers: req.headers,
  });

  if (!sessionData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { content, artworkId, userId, parentId } = await req.json();

    if (!content?.trim() || !artworkId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        artworkId,
        userId,
        parentId,
      },
      include: {
        user: true,
        // Only include replies if this is a top-level comment
        ...(parentId
          ? {}
          : {
              replies: {
                include: {
                  user: true,
                },
              },
            }),
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
