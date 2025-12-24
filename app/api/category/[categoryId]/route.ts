import { NextRequest, NextResponse } from "next/server";
import { and, eq, getTableColumns } from "drizzle-orm";
import db from "@/db";
import { categories, courseProgress, courses } from "@/db/schema";
import { stackServerApp } from "@stack/server";

export const GET = async (
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ categoryId: string }>;
  }
) => {
  const { categoryId } = await params;

  const user = await stackServerApp.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const categoryRows = await db
    .select()
    .from(categories)
    .where(and(eq(categories.id, categoryId)));

  if (categoryRows.length === 0)
    return NextResponse.json(
      { message: `Category not found` },
      { status: 404 }
    );

  const category = categoryRows[0];

  const rows = await db
    .select({
      ...getTableColumns(courses),
      category: getTableColumns(categories),
      progress: getTableColumns(courseProgress),
    })
    .from(courses)
    .leftJoin(categories, eq(courses.categoryID, categories.id))
    .leftJoin(
      courseProgress,
      and(
        eq(courseProgress.userID, user.id),
        eq(courseProgress.courseID, courses.id)
      )
    )
    .where(
      and(eq(courses.status, "published"), eq(courses.categoryID, categoryId))
    );

  return NextResponse.json({
    ...category,
    courses: rows,
  });
};
