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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";

export function UploadForm() {
  const [open, setOpen] = useState(false);
  const [schools, setSchools] = useState<string[]>([]);
  const [loadingSchools, setLoadingSchools] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [generatedTags, setGeneratedTags] = useState<string>("");
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchSchools() {
      setLoadingSchools(true);
      const response = await fetch("/api/schools");
      const schoolNames = await response.json();
      setSchools(schoolNames);
      setLoadingSchools(false);
    }
    fetchSchools();
  }, []);

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
        throw new Error("Failed to analyze image");
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
      <DialogContent className="sm:max-w-[425px]">
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
              Add an image (JPG, PNG or WEBP up to 50MiB)
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
            <Select
              name="school"
              required
              onOpenChange={(open) => {
                if (open && schools.length === 0) {
                  setLoadingSchools(true);
                  fetch("/api/schools")
                    .then((response) => response.json())
                    .then((schoolNames) => {
                      setSchools(schoolNames);
                      setLoadingSchools(false);
                    });
                }
              }}
            >
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
