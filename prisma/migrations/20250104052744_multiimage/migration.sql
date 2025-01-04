/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Artwork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrls" TEXT[];
