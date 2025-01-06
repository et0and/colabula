"use client";

import * as React from "react";
import { Command } from "cmdk";
import { getArtworks } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { Artwork } from "@prisma/client";

type ArtworkWithUser = Artwork & {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

const CommandMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<ArtworkWithUser[]>(
    []
  );
  const router = useRouter();

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Handle search
  React.useEffect(() => {
    const fetchSearchResults = async () => {
      const results = await getArtworks(searchTerm);
      setSearchResults(results);
    };

    const timeoutId = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSelect = (artwork: ArtworkWithUser) => {
    router.push(
      `/portal/${artwork.category.toLowerCase()}/artwork/${artwork.id}`
    );
    setOpen(false);
    setSearchTerm("");
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 transition-opacity animate-in fade-in"
          onClick={() => setOpen(false)}
        />
      )}
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-white rounded-lg shadow-lg border"
      >
        <Command.Input
          value={searchTerm}
          onValueChange={setSearchTerm}
          placeholder="Search portfolios..."
          className="w-full px-4 pt-3 outline-none"
        />
        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          {searchResults.map((artwork) => (
            <Command.Item
              key={artwork.id}
              value={artwork.title}
              onSelect={() => handleSelect(artwork)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
            >
              <div className="flex flex-col gap-1">
                <div className="font-semibold">{artwork.title}</div>
                <div className="text-sm text-muted-foreground">
                  posted by {artwork.user?.name || "Unknown"}{" "}
                  {formatDistanceToNow(artwork.createdAt, { addSuffix: true })}
                </div>
              </div>
            </Command.Item>
          ))}
        </Command.List>
      </Command.Dialog>
    </>
  );
};

export default CommandMenu;
