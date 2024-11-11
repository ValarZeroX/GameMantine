/*
  Warnings:

  - You are about to drop the `cards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `cards`;

-- CreateTable
CREATE TABLE `Cards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(191) NOT NULL,
    `set` VARCHAR(191) NOT NULL,
    `dex` VARCHAR(191) NOT NULL,
    `rarity` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,
    `stage` INTEGER NOT NULL,
    `hp` INTEGER NOT NULL,
    `aspects` INTEGER NOT NULL,
    `attack_1` INTEGER NOT NULL,
    `attack_aspects_1` VARCHAR(191) NOT NULL,
    `attack_skill_1` BOOLEAN NOT NULL,
    `attack_skill_value_1` VARCHAR(191) NOT NULL,
    `attack_2` INTEGER NULL,
    `attack_aspects_2` VARCHAR(191) NULL,
    `attack_skill_2` BOOLEAN NULL,
    `attack_skill_value_2` VARCHAR(191) NULL,
    `ability` BOOLEAN NOT NULL,
    `ability_value` INTEGER NOT NULL,
    `retreat` INTEGER NOT NULL,
    `retreat_aspects` VARCHAR(191) NOT NULL,
    `weakness` INTEGER NOT NULL,
    `weakness_value` INTEGER NOT NULL,
    `illustrator` VARCHAR(191) NOT NULL,
    `point` INTEGER NOT NULL,
    `reprints` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
