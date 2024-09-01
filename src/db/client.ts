import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["query"], //log queries in terminal that prisma generates under the hood
});
