/*
  Warnings:

  - Made the column `assessmentLevel` on table `Artwork` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Artwork" ALTER COLUMN "assessmentLevel" SET NOT NULL;
