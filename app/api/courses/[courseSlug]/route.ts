import { NextRequest, NextResponse } from "next/server";
import { eq, getTableColumns } from "drizzle-orm";
import db from "@/db";
import { categories, courses, lessons } from "@/db/schema";

export const GET = async (
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ courseSlug: string }>;
  }
) => {
  const { courseSlug } = await params;

  const { content, ...lessonsColumns } = getTableColumns(lessons);
  const response = await db
    .select({
      ...getTableColumns(courses),
      category: getTableColumns(categories),
      lessons: lessonsColumns,
    })
    .from(courses)
    .where(eq(courses.slug, courseSlug))
    .leftJoin(categories, eq(courses.categoryID, categories.id))
    .leftJoin(lessons, eq(lessons.courseID, courses.id));

  // If course doesn't exists
  if (response.length === 0)
    return NextResponse.json({ message: `Course not found` }, { status: 404 });

  return NextResponse.json({
    ...response[0],
    lessons: response.map((r) => r.lessons),
  });
};
