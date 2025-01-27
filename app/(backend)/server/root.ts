import { router } from "./index";
import { ratingsRouter } from "./ratings";
import { llamaRouter } from "./llama";
import { commentsRouter } from "./comments";
import { uploadRouter } from "./upload";

export const appRouter = router({
  ratings: ratingsRouter,
  llama: llamaRouter,
  comments: commentsRouter,
  upload: uploadRouter,
});

export type AppRouter = typeof appRouter;
