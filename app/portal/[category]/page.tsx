import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArtCategory } from "@prisma/client";

interface Props {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  // Validate category exists
  const category = params.category.toUpperCase() as ArtCategory;
  if (!Object.values(ArtCategory).includes(category)) {
    notFound();
  }

  const artworks = await prisma.artwork.findMany({
    where: {
      category: category,
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
