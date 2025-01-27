import { router } from "./index";
import { ratingsRouter } from "./ratings";
import { llamaRouter } from "./llama";

export const appRouter = router({
  ratings: ratingsRouter,
  llama: llamaRouter,
});

export type AppRouter = typeof appRouter;
