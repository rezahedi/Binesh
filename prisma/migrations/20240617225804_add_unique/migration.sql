/*
  Warnings:

  - A unique constraint covering the columns `[userID,courseID]` on the table `CourseProgress` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userID,lessonID]` on the table `LessonProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CourseProgress_userID_courseID_key" ON "CourseProgress"("userID", "courseID");

-- CreateIndex
CREATE UNIQUE INDEX "LessonProgress_userID_lessonID_key" ON "LessonProgress"("userID", "lessonID");
