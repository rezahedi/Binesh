"use server";

import db from "@/db";
import { lessonProgress, courseProgress, courses, lessons } from "@/db/schema";
import { stackServerApp } from "@stack/server";
import { and, count, eq } from "drizzle-orm";

export async function updateProgress(courseSlug: string, lessonSlug: string) {
  const user = await stackServerApp.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // get course details
  const courseResult = await db
    .select({ courseId: courses.id, lessonCount: courses.lessonsCount })
    .from(courses)
    .where(eq(courses.slug, courseSlug));
  if (courseResult.length !== 1) {
    throw new Error("Course not found");
  }

  const { courseId, lessonCount } = courseResult[0];

  // get lesson details
  const lessonResult = await db
    .select({ lessonId: lessons.id })
    .from(lessons)
    .where(eq(lessons.slug, lessonSlug));
  if (lessonResult.length !== 1) {
    throw new Error("Lesson not found");
  }

  const { lessonId } = lessonResult[0];

  // update lessonProgress
  await db
    .insert(lessonProgress)
    .values({
      userID: user.id,
      lessonID: lessonId,
      courseID: courseId,
      resumeURL: "",
      progressMap: "",
      timeSpent: 0,
      score: 0,
    })
    .onConflictDoNothing();

  // get count of lessons records
  const lessonCountResult = await db
    .select({ count: count() })
    .from(lessonProgress)
    .where(
      and(
        eq(lessonProgress.userID, user.id),
        eq(lessonProgress.courseID, courseId)
      )
    );
  const lessonCompleted = lessonCountResult[0].count;

  // update courseProgress
  const courseProgressPercentage = Math.round(
    (100 / lessonCount) * lessonCompleted
  );
  console.log({
    userID: user.id,
    courseID: courseId,
    percentage: courseProgressPercentage,
    resumeURL: "",
  });
  await db
    .insert(courseProgress)
    .values({
      userID: user.id,
      courseID: courseId,
      percentage: courseProgressPercentage,
      resumeURL: "",
    })
    .onConflictDoUpdate({
      target: [courseProgress.userID, courseProgress.courseID],
      set: {
        percentage: courseProgressPercentage,
        resumeURL: "",
      },
    });
}
