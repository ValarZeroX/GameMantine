/*
  Warnings:

  - You are about to drop the column `ability_value` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `attack_skill_value_1` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `attack_skill_value_2` on the `Cards` table. All the data in the column will be lost.
  - You are about to alter the column `attack_skill_1` on the `Cards` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - You are about to alter the column `attack_skill_2` on the `Cards` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Cards` DROP COLUMN `ability_value`,
    DROP COLUMN `attack_skill_value_1`,
    DROP COLUMN `attack_skill_value_2`,
    MODIFY `attack_skill_1` VARCHAR(191) NULL,
    MODIFY `attack_skill_2` VARCHAR(191) NULL,
    MODIFY `ability` INTEGER NULL;
