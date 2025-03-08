/// <reference types="gapi" />
/// <reference types="gapi.auth2" />
/// <reference types="gapi.client.drive" />

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArtCategory } from "@prisma/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { trpc } from "@/app/(backend)/server/trpc";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
}

export function GoogleDriveUpload() {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [generatedTags, setGeneratedTags] = useState("");
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [driveFiles, setDriveFiles] = useState<DriveFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<DriveFile[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tokenExpiresAt, setTokenExpiresAt] = useState<number | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ArtCategory | "">("");
  const [assessmentLevel, setAssessmentLevel] = useState("");
  const [content, setContent] = useState("");
  const [school, setSchool] = useState("");

  const router = useRouter();

  // Use tRPC queries and mutations
  const { data: schools, isLoading: loadingSchools } =
    trpc.schools.getSchools.useQuery();
  const getAuthUrlMutation = trpc.googleDrive.getAuthUrl.useMutation();
  const getTokensMutation = trpc.googleDrive.getTokens.useMutation();
  const refreshTokenMutation = trpc.googleDrive.refreshToken.useMutation();

  // Function to check if token is expired
  const isTokenExpired = () => {
    if (!tokenExpiresAt) return true;
    // Add a 60-second buffer to avoid edge cases
    return Date.now() > tokenExpiresAt - 60000;
  };

  // Function to securely store token data
  const storeTokenData = (
    accessToken: string,
    expiresAt: number,
    refreshToken?: string | null
  ) => {
    const tokenData = JSON.stringify({
      accessToken,
      expiresAt,
      refreshToken,
    });
    sessionStorage.setItem("google_token_data", tokenData);
  };

  // Function to get stored token data
  const getStoredTokenData = () => {
    const tokenData = sessionStorage.getItem("google_token_data");
    if (!tokenData) return null;

    try {
      return JSON.parse(tokenData);
    } catch (e) {
      console.error("Error parsing stored token data", e);
      return null;
    }
  };

  // Function to ensure a valid token before API calls
  const ensureValidToken = async () => {
    if (!isTokenExpired()) {
      return accessToken;
    }

    // Token is expired, try to refresh
    if (refreshToken) {
      try {
        const { tokens, expiresAt } = await refreshTokenMutation.mutateAsync({
          refreshToken,
        });

        // Update states with new token info
        setAccessToken(tokens.access_token ?? null);
        setTokenExpiresAt(expiresAt);
        if (tokens.refresh_token) {
          setRefreshToken(tokens.refresh_token);
        }

        // Store updated token data
        storeTokenData(
          tokens.access_token ?? "",
          expiresAt,
          tokens.refresh_token ?? refreshToken
        );

        return tokens.access_token;
      } catch (error) {
        console.error("Error refreshing token:", error);
        setIsAuthorized(false);
        sessionStorage.removeItem("google_token_data");
        toast.error(
          "Your session has expired. Please reconnect to Google Drive."
        );
        return null;
      }
    } else {
      // No refresh token, need to re-authenticate
      setIsAuthorized(false);
      sessionStorage.removeItem("google_token_data");
      toast.error(
        "Your session has expired. Please reconnect to Google Drive."
      );
      return null;
    }
  };

  // File list query with token validation
  const {
    data: fileListData,
    refetch: refetchFiles,
    error: fileListError,
  } = trpc.googleDrive.listFiles.useQuery(
    {
      accessToken: accessToken ?? "",
      pageSize: 20,
      pageToken: nextPageToken,
    },
    {
      enabled: !!accessToken,
    }
  );

  useEffect(() => {
    if (fileListError) {
      console.error("Error fetching files:", fileListError);
      if (
        fileListError.message.includes("invalid_token") ||
        fileListError.message.includes("Invalid Credentials")
      ) {
        // Handle expired token error
        ensureValidToken().then((valid) => {
          if (valid) refetchFiles();
        });
      }
    }
  }, [fileListError, refetchFiles]);

  const getFileContentMutation = trpc.googleDrive.getFileContent.useMutation();
  const llamaMutation = trpc.llama.analyzeImage.useMutation();
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

  // Set drive files when data is fetched
  useEffect(() => {
    if (fileListData?.files) {
      setDriveFiles(
        fileListData.files.map((file) => ({
          id: file.id ?? "",
          name: file.name ?? "",
          mimeType: file.mimeType ?? "",
          thumbnailLink: file.thumbnailLink ?? undefined,
        }))
      );
      setNextPageToken(fileListData.nextPageToken ?? undefined);
    }
  }, [fileListData]);

  // Handle authentication flow
  useEffect(() => {
    if (!open) return;

    const handleAuthCallback = async () => {
      // Check if we're returning from Google OAuth
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          setIsLoading(true);
          const { tokens, expiresAt } = await getTokensMutation.mutateAsync({
            code,
          });

          if (tokens.access_token) {
            setAccessToken(tokens.access_token);
            setTokenExpiresAt(expiresAt);
            setRefreshToken(tokens.refresh_token ?? null);
            setIsAuthorized(true);

            // Store token info securely
            storeTokenData(
              tokens.access_token,
              expiresAt,
              tokens.refresh_token ?? null
            );

            // Clean up URL
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname
            );
          }
        } catch (error) {
          console.error("Error exchanging code for tokens:", error);
          toast.error("Failed to authenticate with Google Drive");
        } finally {
          setIsLoading(false);
        }
      }
    };

    // Check for stored token
    const storedData = getStoredTokenData();
    if (storedData) {
      setAccessToken(storedData.accessToken);
      setTokenExpiresAt(storedData.expiresAt);
      setRefreshToken(storedData.refreshToken || null);

      // Validate the token expiration
      if (!isTokenExpired()) {
        setIsAuthorized(true);
      } else if (storedData.refreshToken) {
        // Try to refresh the token silently on component mount
        ensureValidToken().then((valid) => {
          setIsAuthorized(!!valid);
        });
      } else {
        // Token expired and no refresh token - need to re-authenticate
        sessionStorage.removeItem("google_token_data");
      }
    }

    handleAuthCallback();
  }, [open, getTokensMutation]);

  const handleAuthClick = async () => {
    try {
      setIsLoading(true);
      const { authUrl } = await getAuthUrlMutation.mutateAsync();
      window.location.href = authUrl;
    } catch (error) {
      console.error("Error getting auth URL:", error);
      toast.error("Failed to start Google authentication");
      setIsLoading(false);
    }
  };

  const selectFile = async (file: DriveFile) => {
    if (selectedFiles.some((f) => f.id === file.id)) {
      setSelectedFiles(selectedFiles.filter((f) => f.id !== file.id));
    } else {
      setSelectedFiles([...selectedFiles, file]);
      // Analyze first selected file for tags if this is the first selection
      if (selectedFiles.length === 0) {
        const validToken = await ensureValidToken();
        if (validToken) {
          analyzeGoogleDriveImage(file.id);
        }
      }
    }
  };

  const analyzeGoogleDriveImage = async (fileId: string) => {
    const validToken = await ensureValidToken();
    if (!validToken) return;

    setIsGeneratingTags(true);
    try {
      // Get file content as base64 using tRPC
      const { base64Data } = await getFileContentMutation.mutateAsync({
        accessToken: validToken,
        fileId,
      });

      // Call Llama analysis with base64 data
      const { tags } = await llamaMutation.mutateAsync({ base64: base64Data });
      setGeneratedTags(tags || "");
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast.error("Sorry, I couldn't analyse this image");
    } finally {
      setIsGeneratingTags(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validToken = await ensureValidToken();
    if (!validToken || selectedFiles.length === 0) {
      if (!selectedFiles.length) {
        toast.error("Please select at least one image");
      }
      return;
    }

    setIsUploading(true);

    try {
      // Download files from Google Drive and convert to base64 using tRPC
      const imagesBase64 = await Promise.all(
        selectedFiles.map(async (file) => {
          const { base64Data } = await getFileContentMutation.mutateAsync({
            accessToken: validToken,
            fileId: file.id,
          });
          return base64Data;
        })
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
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images from Google Drive");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <FontAwesomeIcon icon={faGoogleDrive} className="h-4 w-4" />
          From Google Drive
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload from Google Drive</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : !isAuthorized ? (
          <div className="py-8 text-center">
            <p className="mb-4">Connect to Google Drive to select images</p>
            <Button onClick={handleAuthClick}>
              <FontAwesomeIcon icon={faGoogleDrive} className="mr-2" />
              Connect to Google Drive
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Select images from Google Drive</Label>
              <div className="border rounded-md p-2 h-48 overflow-y-auto grid grid-cols-3 gap-2">
                {driveFiles.length === 0 ? (
                  <div className="col-span-3 flex items-center justify-center h-full text-muted-foreground">
                    No images found in your Google Drive
                  </div>
                ) : (
                  driveFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`relative border rounded cursor-pointer overflow-hidden ${
                        selectedFiles.some((f) => f.id === file.id)
                          ? "ring-2 ring-primary"
                          : ""
                      }`}
                      onClick={() => selectFile(file)}
                    >
                      {file.thumbnailLink ? (
                        <img
                          src={file.thumbnailLink}
                          alt={file.name}
                          className="w-full h-20 object-cover"
                        />
                      ) : (
                        <div className="w-full h-20 bg-muted flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faGoogleDrive}
                            className="text-muted-foreground"
                          />
                        </div>
                      )}
                      <div className="p-1 text-xs truncate">{file.name}</div>
                    </div>
                  ))
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Selected {selectedFiles.length}{" "}
                {selectedFiles.length === 1 ? "image" : "images"}
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

            <Button
              type="submit"
              className="w-full"
              disabled={isUploading || selectedFiles.length === 0}
            >
              {isUploading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </span>
              ) : (
                "Upload from Google Drive"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
