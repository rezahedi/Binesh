import { NextRequest, NextResponse } from "next/server";
import { and, asc, eq, getTableColumns } from "drizzle-orm";
import db from "@/db";
import { categories, courseProgress, courses, lessons } from "@/db/schema";

export const GET = async (
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ courseSlug: string }>;
  }
) => {
  const { courseSlug } = await params;

  // TODO: Replace hard coded user id with real data
  const userId = "c30952d5-2600-46f4-9044-37e54acfcb6b";

  const { content: _content, ...lessonsColumns } = getTableColumns(lessons);
  void _content;

  const response = await db
    .select({
      ...getTableColumns(courses),
      category: getTableColumns(categories),
      progress: getTableColumns(courseProgress),
      lessons: lessonsColumns,
    })
    .from(courses)
    .where(eq(courses.slug, courseSlug))
    .leftJoin(categories, eq(courses.categoryID, categories.id))
    .leftJoin(
      courseProgress,
      and(
        eq(courseProgress.courseID, courses.id),
        eq(courseProgress.userID, userId)
      )
    )
    .leftJoin(lessons, eq(lessons.courseID, courses.id))
    .orderBy(asc(lessons.unit), asc(lessons.part));

  // If course doesn't exists
  if (response.length === 0)
    return NextResponse.json({ message: `Course not found` }, { status: 404 });

  return NextResponse.json({
    ...response[0],
    lessons: response.map((r) => r.lessons),
  });
};
