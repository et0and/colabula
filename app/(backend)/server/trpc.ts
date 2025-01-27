import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/app/(backend)/server/root";

export const trpc = createTRPCReact<AppRouter>();
