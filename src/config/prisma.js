import { PrismaClient } from "../../prisma/generated/index.js"

const globalForPrisma = globalThis

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

