/*
  Warnings:

  - You are about to alter the column `mycards` on the `FavoriteCard` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `FavoriteCard` MODIFY `mycards` JSON NOT NULL;
