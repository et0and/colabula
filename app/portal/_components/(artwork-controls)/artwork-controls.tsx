"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditArtworkForm } from "./edit-artwork-form";
import { DeleteArtworkButton } from "./delete-artwork-button";
import { PencilIcon } from "lucide-react";

interface ArtworkControlsProps {
  artwork: {
    id: string;
    title: string;
    content: string;
    category: string;
    assessmentLevel: string;
    tags: string[];
    userId: string;
    imageUrls: string[];
  };
}

export function ArtworkControls({ artwork }: ArtworkControlsProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex space-x-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <PencilIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit post</DialogTitle>
          <EditArtworkForm artwork={artwork} onCancel={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
      <DeleteArtworkButton artworkId={artwork.id} />
    </div>
  );
}
