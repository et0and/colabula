import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/app/(backend)/server/root";
import { createContext } from "@/app/(backend)/server/context";

export const runtime = "nodejs";

const handlerConfig = {
  endpoint: "/api/trpc",
  router: appRouter,
  createContext,
  batching: {
    enabled: true,
  },
};

// For GET requests
export const GET = async (req: Request) => {
  return fetchRequestHandler({
    ...handlerConfig,
    req,
  });
};

// For POST requests
export const POST = async (req: Request) => {
  return fetchRequestHandler({
    ...handlerConfig,
    req,
  });
};
