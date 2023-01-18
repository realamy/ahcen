import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createContext } from "~/server/context";
import { appRouter } from "~/server/routers/_app";
import { env } from "@/common/env/server.mjs";

export default createNextApiHandler({
  router: appRouter,
  createContext(opts) {
    return createContext({
      type: "api",
      ...opts,
    });
  },
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
});
