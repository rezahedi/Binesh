"use server";

import db from "@/db";
import { lessonProgress, courseProgress, courses, lessons } from "@/db/schema";
import { stackServerApp } from "@stack/server";
import { and, count, eq, getTableColumns } from "drizzle-orm";

export async function updateProgress(courseSlug: string, lessonSlug: string) {
  const user = await stackServerApp.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { id: courseId, lessonsCount } = await getCourseBySlug(courseSlug);
  const { id: lessonId } = await getLessonBySlug(courseId, lessonSlug);

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

  const courseProgressPercentage = Math.round(
    (100 / lessonsCount) * lessonCompleted
  );

  // update courseProgress
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

export async function resetLessonProgress(
  courseSlug: string,
  lessonSlug: string
) {
  const user = await stackServerApp.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  await db
    .delete(lessonProgress)
    .where(
      and(
        eq(lessonProgress.userID, user.id),
        eq(lessonProgress.courseID, courseSlug),
        eq(lessonProgress.lessonID, lessonSlug)
      )
    );
}

async function getCourseBySlug(courseSlug: string) {
  const courseResult = await db
    .select(getTableColumns(courses))
    .from(courses)
    .where(eq(courses.slug, courseSlug));
  if (courseResult.length !== 1) {
    throw new Error("Course not found");
  }

  return courseResult[0];
}

async function getLessonBySlug(courseId: string, lessonSlug: string) {
  const lessonResult = await db
    .select(getTableColumns(lessons))
    .from(lessons)
    .where(and(eq(lessons.courseID, courseId), eq(lessons.slug, lessonSlug)));
  if (lessonResult.length !== 1) {
    throw new Error("Lesson not found");
  }

  return lessonResult[0];
}
