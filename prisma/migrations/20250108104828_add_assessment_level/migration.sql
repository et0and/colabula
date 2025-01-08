/*
  Warnings:

  - Added the required column `assessmentLevel` to the `Artwork` table without a default value. This is not possible if the table is not empty.

*/

-- First add the column with a default value
ALTER TABLE "Artwork" ADD COLUMN "assessmentLevel" TEXT DEFAULT '1.1';

-- Then remove the default constraint
ALTER TABLE "Artwork" ALTER COLUMN "assessmentLevel" DROP DEFAULT;
