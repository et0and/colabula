import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "https://colabula.com",
});

export const { signIn, signOut, signUp, useSession } = authClient;
