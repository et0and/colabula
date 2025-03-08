import { router } from "./index";
import { ratingsRouter } from "./ratings";
import { llamaRouter } from "./llama";
import { commentsRouter } from "./comments";
import { uploadRouter } from "./upload";
import { artworksRouter } from "./artworks";
import { schoolsRouter } from "./schools";
import { googleDriveRouter } from "./drive";

export const appRouter = router({
  ratings: ratingsRouter,
  llama: llamaRouter,
  comments: commentsRouter,
  upload: uploadRouter,
  artworks: artworksRouter,
  schools: schoolsRouter,
  googleDrive: googleDriveRouter,
});

export type AppRouter = typeof appRouter;
