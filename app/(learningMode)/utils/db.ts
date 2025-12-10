import db from "@/db";
import { courses, lessons } from "@/db/schema";
import { and, eq, getTableColumns } from "drizzle-orm";

export async function getCourseBySlug(courseSlug: string) {
  const courseResult = await db
    .select(getTableColumns(courses))
    .from(courses)
    .where(eq(courses.slug, courseSlug));
  if (courseResult.length !== 1) {
    throw new Error("Course not found");
  }

  return courseResult[0];
}

export async function getLessonBySlug(courseId: string, lessonSlug: string) {
  const lessonResult = await db
    .select(getTableColumns(lessons))
    .from(lessons)
    .where(and(eq(lessons.courseID, courseId), eq(lessons.slug, lessonSlug)));
  if (lessonResult.length !== 1) {
    throw new Error("Lesson not found");
  }

  return lessonResult[0];
}
