"use server";

import db from "@/db";
import { lessonProgress, courseProgress, lessons } from "@/db/schema";
import { LessonProps } from "@/lib/types";
import { stackServerApp } from "@stack/server";
import { and, asc, count, eq, getTableColumns, isNull } from "drizzle-orm";
import { getCourseBySlug, getLessonBySlug } from "../utils/db";

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

  // If there is unfinished lessons, store next lessons in course progress
  let nextLessons: LessonProps | null = null;
  if (courseProgressPercentage < 100) {
    // Get first lesson in order that is not finished
    const rows = await db
      .select(getTableColumns(lessons))
      .from(lessons)
      .orderBy(asc(lessons.sequence))
      .leftJoin(
        lessonProgress,
        and(
          eq(lessons.id, lessonProgress.lessonID),
          eq(lessonProgress.userID, user.id)
        )
      )
      .where(and(eq(lessons.courseID, courseId), isNull(lessonProgress.id)))
      .limit(1);
    if (rows.length === 1) nextLessons = rows[0];
  }

  // update courseProgress
  await db
    .insert(courseProgress)
    .values({
      userID: user.id,
      courseID: courseId,
      percentage: courseProgressPercentage,
      resumeURL: nextLessons ? nextLessons.slug : "",
      nextLessonID: nextLessons ? nextLessons.id : null,
    })
    .onConflictDoUpdate({
      target: [courseProgress.userID, courseProgress.courseID],
      set: {
        percentage: courseProgressPercentage,
        resumeURL: nextLessons ? nextLessons.slug : "",
        nextLessonID: nextLessons ? nextLessons.id : null,
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

  const { id: courseId } = await getCourseBySlug(courseSlug);
  const { id: lessonId } = await getLessonBySlug(courseId, lessonSlug);

  await db
    .delete(lessonProgress)
    .where(
      and(
        eq(lessonProgress.userID, user.id),
        eq(lessonProgress.courseID, courseId),
        eq(lessonProgress.lessonID, lessonId)
      )
    );
}
