"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ShareCardProps {
  baseUrl: string;
  category: string;
  artworkId: string;
}

export function ShareCard({ baseUrl, category, artworkId }: ShareCardProps) {
  const shareUrl = `${baseUrl}/portal/${category}/artwork/${artworkId}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Copy the link below to share this artwork with others.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input defaultValue={shareUrl} readOnly />
          <Button
            type="button"
            size="sm"
            className="px-3"
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
            }}
          >
            Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
