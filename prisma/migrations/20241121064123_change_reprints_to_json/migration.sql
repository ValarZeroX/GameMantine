/*
  Warnings:

  - You are about to alter the column `reprints` on the `Card` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Card` MODIFY `reprints` JSON NULL;
