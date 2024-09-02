/*
  Warnings:

  - Added the required column `eventId` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "eventId" INTEGER NOT NULL;
