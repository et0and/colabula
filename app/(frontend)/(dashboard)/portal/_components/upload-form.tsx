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
} from "@/components/ui/select";
import { ArtCategory } from "@prisma/client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { trpc } from "@/app/(backend)/server/trpc";

export function UploadForm() {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [generatedTags, setGeneratedTags] = useState("");
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ArtCategory | "">("");
  const [assessmentLevel, setAssessmentLevel] = useState("");
  const [content, setContent] = useState("");
  const [school, setSchool] = useState("");

  const router = useRouter();

  // Use tRPC query instead of direct API call
  const { data: schools, isLoading: loadingSchools } =
    trpc.schools.getSchools.useQuery();

  const llamaMutation = trpc.llama.analyzeImage.useMutation();

  const analyzeImage = useCallback(
    async (file: File) => {
      setIsGeneratingTags(true);
      try {
        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString("base64");
        const { tags } = await llamaMutation.mutateAsync({ base64 });
        setGeneratedTags(tags || "");
      } catch (error) {
        console.error("Error analyzing image:", error);
        toast.error("Sorry, I couldn't analyse this portfolio");
      } finally {
        setIsGeneratingTags(false);
      }
    },
    [llamaMutation]
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const allFiles = Array.from(files);
      setSelectedFiles(allFiles);
      if (allFiles.length > 0) {
        analyzeImage(allFiles[0]);
      }
    },
    [analyzeImage]
  );

  const uploadMutation = trpc.upload.uploadPortfolio.useMutation({
    onSuccess: () => {
      setOpen(false);
      if (category) {
        router.push(`/portal/${category.toLowerCase()}`);
      }
      router.refresh();
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        toast.error(`Upload failed: ${err.message}`);
      } else {
        toast.error("Upload failed: Unknown error");
      }
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUploading(true);

    try {
      const imagesBase64 = await Promise.all(
        selectedFiles.map(
          (file) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                const result = reader.result as string;
                // Remove the "data:image/..." prefix
                const base64 = result.split(",")[1] ?? "";
                resolve(base64);
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            })
        )
      );

      await uploadMutation.mutateAsync({
        images: imagesBase64,
        title: title.trim(),
        category: category as ArtCategory,
        assessmentLevel,
        tags: generatedTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        content,
        school,
      });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <Paperclip className="h-4 w-4" />
          From computer
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload portfolio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Portfolio image</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              multiple
              required
              onChange={(e) => {
                const files = e.target.files;
                if (!files) return;
                const totalSize = Array.from(files).reduce(
                  (sum, file) => sum + file.size,
                  0
                );
                if (totalSize > 50 * 1024 * 1024) {
                  e.target.value = "";
                  alert("Total file size must be less than 50MiB");
                  return;
                }
                handleFiles(files);
              }}
            />
            <p className="text-xs text-muted-foreground">
              Add one or more images (JPG, PNG, or WEBP up to 50MiB). We scan
              the first image for tags.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter a name for this portfolio"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              name="category"
              required
              value={category}
              onValueChange={(val) => setCategory(val as ArtCategory)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ArtCategory).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0) + cat.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assessmentLevel">Assessment level</Label>
            <Select
              name="assessmentLevel"
              required
              value={assessmentLevel}
              onValueChange={(val) => setAssessmentLevel(val)}
            >
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">From what school?</Label>
            <Select
              name="school"
              required
              value={school}
              onValueChange={(val) => setSchool(val)}
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
                  schools?.map((schoolName) => (
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
