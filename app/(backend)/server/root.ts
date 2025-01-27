import { router } from "./index";
import { ratingsRouter } from "./ratings";
import { llamaRouter } from "./llama";
import { commentsRouter } from "./comments";

export const appRouter = router({
  ratings: ratingsRouter,
  llama: llamaRouter,
  comments: commentsRouter,
});

export type AppRouter = typeof appRouter;
