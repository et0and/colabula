import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@/app/(backend)/server/root";

// Create a standalone client for non-React contexts
const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
});

export async function getGoogleAccessToken() {
  const accessToken = localStorage.getItem("googleAccessToken");
  const refreshToken = localStorage.getItem("googleRefreshToken");
  const expiresAt = parseInt(
    localStorage.getItem("googleTokenExpiresAt") ?? "0"
  );

  // If token exists and is not expired, return it
  if (accessToken && expiresAt > Date.now()) {
    return accessToken;
  }

  // If refresh token exists, try to refresh the access token
  if (refreshToken) {
    try {
      // Use the standalone client instead of the React hooks-based client
      const result = await client.googleDrive.refreshToken.mutate({
        refreshToken,
      });

      localStorage.setItem(
        "googleAccessToken",
        result.tokens.access_token ?? ""
      );
      localStorage.setItem("googleTokenExpiresAt", result.expiresAt.toString());

      return result.tokens.access_token;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      // Clear invalid tokens
      clearGoogleTokens();
      return null;
    }
  }

  return null;
}

export function clearGoogleTokens() {
  localStorage.removeItem("googleAccessToken");
  localStorage.removeItem("googleRefreshToken");
  localStorage.removeItem("googleTokenExpiresAt");
}
