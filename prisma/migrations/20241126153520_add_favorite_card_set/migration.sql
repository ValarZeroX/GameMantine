-- CreateTable
CREATE TABLE `FavoriteCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `set` VARCHAR(191) NOT NULL,
    `mycards` VARCHAR(191) NOT NULL,

    INDEX `FavoriteCard_userId_idx`(`userId`),
    INDEX `FavoriteCard_set_idx`(`set`),
    UNIQUE INDEX `FavoriteCard_userId_set_key`(`userId`, `set`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FavoriteCard` ADD CONSTRAINT `FavoriteCard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
