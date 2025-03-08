import { publicProcedure, router } from "./index";
import * as yup from "yup";
import { google } from "googleapis";
import { TRPCError } from "@trpc/server";
import { Credentials } from "google-auth-library";

// Define an extended interface for Google tokens that includes expires_in
interface GoogleTokens extends Credentials {
  expires_in?: number;
}

// Configure OAuth2 client
const getOAuth2Client = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.NEXT_PUBLIC_APP_URL + "/api/google/callback"
  );
};

export const googleDriveRouter = router({
  // Get authorization URL
  getAuthUrl: publicProcedure.mutation(async () => {
    const oauth2Client = getOAuth2Client();

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/drive.readonly"],
      prompt: "consent", // Force re-consent to get refresh token
    });

    return { authUrl };
  }),

  // Exchange code for tokens
  getTokens: publicProcedure
    .input(
      yup.object({
        code: yup.string().required("Authorization code is required"),
      })
    )
    .mutation(async ({ input }) => {
      const oauth2Client = getOAuth2Client();

      try {
        const { tokens } = await oauth2Client.getToken(input.code);
        // Cast tokens to our extended interface
        const googleTokens = tokens as GoogleTokens;

        return {
          tokens,
          expiresAt:
            googleTokens.expiry_date ??
            (googleTokens.expires_in
              ? Date.now() + googleTokens.expires_in * 1000
              : Date.now() + 3600 * 1000),
          hasRefreshToken: !!tokens.refresh_token,
        };
      } catch (error) {
        console.error("Error exchanging code for tokens:", error);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to exchange authorization code for tokens",
        });
      }
    }),

  // Refresh tokens
  refreshToken: publicProcedure
    .input(
      yup.object({
        refreshToken: yup.string().required("Refresh token is required"),
      })
    )
    .mutation(async ({ input }) => {
      const oauth2Client = getOAuth2Client();
      oauth2Client.setCredentials({ refresh_token: input.refreshToken });

      try {
        const { credentials } = await oauth2Client.refreshAccessToken();
        // Cast credentials to our extended interface
        const googleCredentials = credentials as GoogleTokens;

        return {
          tokens: credentials,
          expiresAt:
            googleCredentials.expiry_date ??
            (googleCredentials.expires_in
              ? Date.now() + googleCredentials.expires_in * 1000
              : Date.now() + 3600 * 1000),
        };
      } catch (error) {
        console.error("Error refreshing token:", error);
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to refresh access token",
        });
      }
    }),

  // List files from Google Drive
  listFiles: publicProcedure
    .input(
      yup.object({
        accessToken: yup.string().required("Access token is required"),
        pageSize: yup.number().default(20),
        pageToken: yup.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const oauth2Client = getOAuth2Client();
      oauth2Client.setCredentials({ access_token: input.accessToken });

      const drive = google.drive({ version: "v3", auth: oauth2Client });

      try {
        const response = await drive.files.list({
          q: "mimeType contains 'image/' and trashed = false",
          pageSize: input.pageSize,
          pageToken: input.pageToken,
          fields: "nextPageToken, files(id, name, mimeType, thumbnailLink)",
        });

        return {
          files: response.data.files || [],
          nextPageToken: response.data.nextPageToken,
        };
      } catch (error) {
        console.error("Error listing files from Drive:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to list files from Google Drive",
        });
      }
    }),

  // Get file content
  getFileContent: publicProcedure
    .input(
      yup.object({
        accessToken: yup.string().required("Access token is required"),
        fileId: yup.string().required("File ID is required"),
      })
    )
    .mutation(async ({ input }) => {
      const oauth2Client = getOAuth2Client();
      oauth2Client.setCredentials({ access_token: input.accessToken });

      const drive = google.drive({ version: "v3", auth: oauth2Client });

      try {
        const response = await drive.files.get(
          {
            fileId: input.fileId,
            alt: "media",
          },
          {
            responseType: "arraybuffer",
          }
        );

        // Convert buffer to base64
        const buffer = Buffer.from(response.data);
        const base64Data = buffer.toString("base64");

        return {
          base64Data,
          mimeType: response.headers["content-type"],
        };
      } catch (error) {
        console.error("Error getting file content:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get file content from Google Drive",
        });
      }
    }),
});
