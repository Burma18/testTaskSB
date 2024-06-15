-- AlterTable
ALTER TABLE `user` MODIFY `lastName` VARCHAR(191) NULL,
    MODIFY `gender` ENUM('Male', 'Female') NULL,
    MODIFY `photo` VARCHAR(191) NULL;
