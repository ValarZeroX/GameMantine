-- AlterTable
ALTER TABLE `Account` ADD COLUMN `role` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Card` MODIFY `ability` VARCHAR(191) NULL;
