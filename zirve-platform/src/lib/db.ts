import path from "path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createClient() {
  const fromEnv = process.env.DATABASE_URL;
  let dbFile = path.join(process.cwd(), "prisma", "dev.db");
  if (fromEnv?.startsWith("file:")) {
    const rel = fromEnv.replace(/^file:/, "").replace(/^\.?\//, "");
    dbFile = path.isAbsolute(rel) ? rel : path.join(process.cwd(), rel);
  }

  const adapter = new PrismaBetterSqlite3({ url: dbFile });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
