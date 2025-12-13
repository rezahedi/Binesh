import { NextRequest, NextResponse } from "next/server";
import { and, asc, eq, getTableColumns } from "drizzle-orm";
import db from "@/db";
import {
  categories,
  courseProgress,
  courses,
  lessonProgress,
  lessons,
} from "@/db/schema";
import { stackServerApp } from "@stack/server";

export const GET = async (
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ courseSlug: string }>;
  }
) => {
  const { courseSlug } = await params;

  const user = await stackServerApp.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { content: _content, ...lessonsColumns } = getTableColumns(lessons);
  void _content;

  const response = await db
    .select({
      ...getTableColumns(courses),
      category: getTableColumns(categories),
      progress: getTableColumns(courseProgress),
      lessons: lessonsColumns,
      lessonProgress: getTableColumns(lessonProgress),
    })
    .from(courses)
    .where(eq(courses.slug, courseSlug))
    .leftJoin(categories, eq(courses.categoryID, categories.id))
    .leftJoin(
      courseProgress,
      and(
        eq(courseProgress.userID, user.id),
        eq(courseProgress.courseID, courses.id)
      )
    )
    .leftJoin(lessons, eq(lessons.courseID, courses.id))
    .orderBy(asc(lessons.unit), asc(lessons.part))
    .leftJoin(
      lessonProgress,
      and(
        eq(lessonProgress.userID, user.id),
        eq(lessonProgress.courseID, courses.id),
        eq(lessonProgress.lessonID, lessons.id)
      )
    );

  // If course doesn't exists
  if (response.length === 0)
    return NextResponse.json({ message: `Course not found` }, { status: 404 });

  return NextResponse.json({
    ...response[0],
    lessons: response
      .filter((r) => r.lessons?.id)
      .map((r, i) => ({
        ...r.lessons,
        progress: response[i].lessonProgress,
      })),
    lessonProgress: undefined,
  });
};
