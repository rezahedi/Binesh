-- CreateTable
CREATE TABLE "CourseProgress" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "courseID" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "resumeURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseProgress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
