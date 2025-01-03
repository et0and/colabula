import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArtCategory } from "@prisma/client";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  const categoryUpper = category.toUpperCase() as ArtCategory;
  if (!Object.values(ArtCategory).includes(categoryUpper)) {
    notFound();
  }

  const artworks = await prisma.artwork.findMany({
    where: {
      category: categoryUpper,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      {artworks.map((artwork) => (
        <div key={artwork.id} className="aspect-video rounded-xl">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
      ))}
    </div>
  );
}
