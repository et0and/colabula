import { Artwork } from "@prisma/client";

// Define the type for artwork with user
type ArtworkWithUser = Artwork & {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

export const getArtworks = async (
  searchTerm: string,
): Promise<ArtworkWithUser[]> => {
  if (searchTerm.length < 3) {
    return [];
  }

  try {
    const response = await fetch(
      `/api/search?q=${encodeURIComponent(searchTerm)}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data as ArtworkWithUser[];
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};
