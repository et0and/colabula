import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export async function createContext({ req }: FetchCreateContextFnOptions) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  return {
    session,
    prisma,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
