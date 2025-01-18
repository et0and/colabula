"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface EditArtworkFormProps {
  artwork: {
    id: string;
    title: string;
    content: string;
    category: string;
    assessmentLevel: string;
    tags: string[];
    imageUrls: string[];
  };
  onCancel: () => void;
}

export function EditArtworkForm({ artwork, onCancel }: EditArtworkFormProps) {
  const [formData, setFormData] = useState(artwork);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("tags", JSON.stringify(formData.tags));
      formDataToSend.append(
        "existingImages",
        JSON.stringify(formData.imageUrls)
      );

      // Append new images if any
      newImages.forEach((file) => {
        formDataToSend.append("newImages", file);
      });

      const response = await fetch(`/api/artworks/${artwork.id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to update artwork");

      toast.success("Artwork updated successfully");
      router.refresh();
      onCancel();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update artwork");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Existing image preview */}
      <div className="grid grid-cols-3 gap-4">
        {formData.imageUrls.map((url, index) => (
          <div key={index} className="relative">
            <img
              src={url}
              alt={`Artwork ${index + 1}`}
              className="rounded-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => removeImage(index)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {/* New image upload */}
      <div className="space-y-2">
        <Input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            const totalSize = files.reduce((sum, file) => sum + file.size, 0);
            if (totalSize > 50 * 1024 * 1024) {
              toast.error("Total file size must be less than 50MiB");
              return;
            }
            setNewImages(files);
          }}
        />
        <p className="text-xs text-muted-foreground">
          Add more images (JPG, PNG or WEBP up to 50MiB total)
        </p>
      </div>

      {/* Existing form fields */}
      <Input
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Title"
      />
      <Textarea
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        placeholder="Content"
      />
      <Input
        value={formData.tags.join(", ")}
        onChange={(e) =>
          setFormData({
            ...formData,
            tags: e.target.value.split(",").map((tag) => tag.trim()),
          })
        }
        placeholder="Tags (comma separated)"
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
