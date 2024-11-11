-- AlterTable
ALTER TABLE `Card` ADD COLUMN `ability_directions` VARCHAR(191) NULL,
    ADD COLUMN `ability_name` VARCHAR(191) NULL,
    ADD COLUMN `attack_name_1` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `attack_name_2` VARCHAR(191) NULL,
    ADD COLUMN `attack_skill_name_1` VARCHAR(191) NULL,
    ADD COLUMN `attack_skill_name_2` VARCHAR(191) NULL,
    ADD COLUMN `rule` VARCHAR(191) NULL;
