/* eslint-disable vars-on-top */
/**
 * Instantiates a single instance PrismaClient and save it on the global object.
 * @link https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
import { env } from "@/common/env/server.mjs";
import { isENVDev } from "@/constant";
import { type Prisma, PrismaClient } from "~/prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prismaOptions: Prisma.PrismaClientOptions = {};

if (isENVDev) prismaOptions.log = ["query", "error", "warn"];

export const prisma = globalThis.prisma || new PrismaClient(prismaOptions);

export const customPrisma = (options: Prisma.PrismaClientOptions) =>
  new PrismaClient({ ...prismaOptions, ...options });

if (env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
// // If any changed on middleware server restart is required
// bookingReferenceMiddleware(prisma);
// eventTypeDescriptionParseAndSanitizeMiddleware(prisma);

export default prisma;


