/*
  Warnings:

  - You are about to drop the column `averageRating` on the `Deck` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Deck` DROP COLUMN `averageRating`;

-- AlterTable
ALTER TABLE `DeckRating` ADD COLUMN `comment` VARCHAR(191) NOT NULL DEFAULT '';
