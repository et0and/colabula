import { UploadForm } from "@/components/upload-form";

export default function UploadPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Upload a portfolio</h1>
      <UploadForm />
    </div>
  );
}
