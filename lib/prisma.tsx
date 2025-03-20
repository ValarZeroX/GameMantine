import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // 選擇是否在控制台顯示查詢日誌
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;