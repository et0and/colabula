import { router } from "./index";
import { ratingsRouter } from "./ratings";
import { llamaRouter } from "./llama";
import { commentsRouter } from "./comments";
import { uploadRouter } from "./upload";
import { artworksRouter } from "./artworks";

export const appRouter = router({
  ratings: ratingsRouter,
  llama: llamaRouter,
  comments: commentsRouter,
  upload: uploadRouter,
  artworks: artworksRouter,
});

export type AppRouter = typeof appRouter;
