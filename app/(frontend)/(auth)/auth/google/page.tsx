"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "@/app/(backend)/server/trpc";

export default function GoogleAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use the useMutation hook instead of calling mutate directly
  const getTokensMutation = trpc.googleDrive.getTokens.useMutation({
    onSuccess: (result) => {
      // Store tokens in localStorage
      localStorage.setItem(
        "googleAccessToken",
        result.tokens.access_token || ""
      );
      if (result.tokens.refresh_token) {
        localStorage.setItem("googleRefreshToken", result.tokens.refresh_token);
      }
      localStorage.setItem("googleTokenExpiresAt", result.expiresAt.toString());

      setIsProcessing(false);
      // Redirect to the dashboard
      router.push("/dashboard");
    },
    onError: (err) => {
      console.error("Failed to exchange code for tokens:", err);
      setError("Failed to authenticate with Google. Please try again.");
      setIsProcessing(false);
    },
  });

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      setError("Authorization code is missing");
      setIsProcessing(false);
      return;
    }

    const processCode = async () => {
      try {
        // Call the mutation
        getTokensMutation.mutate({ code });
      } catch (err) {
        console.error("Failed to exchange code for tokens:", err);
        setError("Failed to authenticate with Google. Please try again.");
        setIsProcessing(false);
      }
    };

    processCode();
  }, [searchParams, router, getTokensMutation]);

  // Use isProcessing in the component rendering
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-md p-6 max-w-md">
          <h1 className="text-xl font-semibold text-red-700 mb-2">
            Authentication Error
          </h1>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-xl font-semibold mb-4 text-center">
          {isProcessing
            ? "Completing Google Authentication"
            : "Authentication Complete"}
        </h1>
        {isProcessing ? (
          <>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
            <p className="text-gray-600 text-center mt-4">
              Please wait while we complete the authentication process...
            </p>
          </>
        ) : (
          <p className="text-gray-600 text-center mt-4">
            Successfully authenticated! Redirecting to dashboard...
          </p>
        )}
      </div>
    </div>
  );
}
