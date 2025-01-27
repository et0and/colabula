import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/app/(backend)/server/root";
import { createContext } from "@/app/(backend)/server/context";

export const runtime = "nodejs";

// For GET requests
export const GET = async (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });
};

// For POST requests
export const POST = async (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });
};
