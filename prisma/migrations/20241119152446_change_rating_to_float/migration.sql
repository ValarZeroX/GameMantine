/*
  Warnings:

  - You are about to alter the column `rating` on the `DeckRating` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `DeckRating` MODIFY `rating` DOUBLE NOT NULL;
