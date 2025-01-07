import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const sessionData = await auth.api.getSession({
    headers: req.headers,
  });

  if (!sessionData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get("q");

  if (!searchTerm || searchTerm.length < 3) {
    return NextResponse.json([]);
  }

  try {
    const results = await prisma.artwork.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm, mode: "insensitive" } },
          { content: { contains: searchTerm, mode: "insensitive" } },
          { tags: { hasSome: searchTerm.split(" ") } },
          { user: { name: { contains: searchTerm, mode: "insensitive" } } },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      take: 5,
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}
