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
import { ShareIcon } from "lucide-react";
import { toast } from "sonner";

interface ShareCardProps {
  baseUrl: string;
  category: string;
  artworkId: string;
}

export function ShareCard({
  baseUrl,
  category,
  artworkId,
}: Readonly<ShareCardProps>) {
  const shareUrl = `${baseUrl}/portal/${category}/artwork/${artworkId}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Share artwork">
          <ShareIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-w-xs rounded">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Copy the link below to share this artwork with other Colabula
            members
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
              toast.success("Link copied to clipboard");
            }}
          >
            Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
