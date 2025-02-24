import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export async function createContext({ req }: FetchCreateContextFnOptions) {
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: req.headers,
    });
  } catch (error) {
    console.error('Failed to retrieve session:', error);
  }

  return {
    session,
    prisma,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
