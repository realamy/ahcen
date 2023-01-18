/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from "../trpc";

export const appRouter = router({
  whoami: publicProcedure.query(({ ctx }) => ctx.user),
});

export type AppRouter = typeof appRouter;
