/*
  Warnings:

  - Changed the type of `state` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('TODO', 'DOING', 'DONE');

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "state",
ADD COLUMN     "state" "status" NOT NULL;
