/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseID,slug]` on the table `Lessons` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `username` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Categories_slug_key" ON "Categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Courses_slug_key" ON "Courses"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Lessons_courseID_slug_key" ON "Lessons"("courseID", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
