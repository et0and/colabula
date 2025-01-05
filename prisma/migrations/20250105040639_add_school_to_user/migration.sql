/*
  Warnings:

  - Added the required column `school` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- First add the column with a default value
ALTER TABLE "user" ADD COLUMN "school" TEXT DEFAULT 'Unknown School';

-- Then remove the default constraint
ALTER TABLE "user" ALTER COLUMN "school" DROP DEFAULT;

-- Finally make it required
ALTER TABLE "user" ALTER COLUMN "school" SET NOT NULL;

