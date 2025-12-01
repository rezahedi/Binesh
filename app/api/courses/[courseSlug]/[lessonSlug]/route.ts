import { NextRequest, NextResponse } from "next/server";
import { eq, getTableColumns, and } from "drizzle-orm";
import db from "@/db";
import { courses, lessons } from "@/db/schema";
import { parseLesson } from "@/lib/quizParser";

export const GET = async (
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ courseSlug: string; lessonSlug: string }>;
  }
) => {
  const { courseSlug, lessonSlug } = await params;

  const courseResult = await db
    .select({ courseId: courses.id })
    .from(courses)
    .where(eq(courses.slug, courseSlug));

  // If course doesn't exists
  if (courseResult.length === 0)
    return NextResponse.json({ message: `Course not found` }, { status: 404 });

  const { courseId } = courseResult[0];

  const lessonResult = await db
    .select(getTableColumns(lessons))
    .from(lessons)
    .where(and(eq(lessons.courseID, courseId), eq(lessons.slug, lessonSlug)));

  // If lesson doesn't exists
  if (lessonResult.length === 0)
    return NextResponse.json({ message: `Lesson not found` }, { status: 404 });

  // Parse markdown content
  const { metadata, steps } = parseLesson(lessonResult[0].content);

  return NextResponse.json({
    ...lessonResult[0],
    content: undefined,
    steps,
  });
};
