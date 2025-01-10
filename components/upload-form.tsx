"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Paperclip } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ArtCategory } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export function UploadForm() {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [generatedTags, setGeneratedTags] = useState<string>("");
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const router = useRouter();

  const { data: schools = [], isLoading: loadingSchools } = useQuery<string[]>({
    queryKey: ["schools"],
    queryFn: async () => {
      const response = await fetch("/api/schools");
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours (formerly cacheTime)
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setOpen(false);
        const category = formData.get("category")?.toString().toLowerCase();
        router.push(`/portal/${category}`);
        router.refresh();
      }
    } finally {
      setIsUploading(false);
    }
  }

  const analyzeImage = async (file: File) => {
    setIsGeneratingTags(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/llama", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        toast.error("Sorry, I couldn't analyse this portfolio");
      }

      const data = await response.json();
      setGeneratedTags(data.tags || "");
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setIsGeneratingTags(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <Paperclip className="h-4 w-4" />
          From computer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload portfolio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Portfolio image</Label>
            <Input
              id="file"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              name="file"
              multiple
              required
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                const totalSize = files.reduce(
                  (sum, file) => sum + file.size,
                  0
                );
                if (totalSize > 50 * 1024 * 1024) {
                  e.target.value = "";
                  alert("Total file size must be less than 50MiB");
                }
                // Analyze the first image
                if (files.length > 0) {
                  analyzeImage(files[0]);
                }
              }}
            />
            <p className="text-xs text-muted-foreground">
              Add one or more images (JPG, PNG or WEBP up to 50MiB). We will
              scan the first image for tags.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter a name for this portfolio"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ArtCategory).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0) + category.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assessmentLevel">Assessment level</Label>
            <Select name="assessmentLevel" required>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "1.1",
                  "1.2",
                  "1.3",
                  "1.4",
                  "2.1",
                  "2.2",
                  "2.3",
                  "2.4",
                  "3.1",
                  "3.2",
                  "3.3",
                  "3.4",
                  "3.5",
                ].map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Description</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Describe this portfolio..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">From what school?</Label>
            <Select name="school" required>
              <SelectTrigger>
                <SelectValue placeholder="Select school" />
              </SelectTrigger>
              <SelectContent>
                {loadingSchools ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  schools.map((schoolName) => (
                    <SelectItem key={schoolName} value={schoolName}>
                      {schoolName}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              name="tags"
              placeholder="landscape,oil paint,nature"
              required
              value={generatedTags}
              onChange={(e) => setGeneratedTags(e.target.value)}
            />
            {isGeneratingTags && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating tags...
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload portfolio"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
