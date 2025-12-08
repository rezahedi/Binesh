import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, getTableColumns, like, or } from "drizzle-orm";
import db from "@/db";
import { categories, courseProgress, courses } from "@/db/schema";
import { getSearchParams } from "@/utils/urls";

export const GET = async (request: NextRequest) => {
  const searchParams = getSearchParams(request.url);
  const ROWS_PER_PAGE = 10;
  const {
    search,
    sort = "createdAt",
    page = "1",
  } = searchParams as {
    search?: string;
    sort?: "createdAt" | "updatedAt";
    page?: string;
  };

  // TODO: Replace hard coded user id with real data
  const userId = "c30952d5-2600-46f4-9044-37e54acfcb6b";

  const query = db
    .select({
      ...getTableColumns(courses),
      category: getTableColumns(categories),
      progress: getTableColumns(courseProgress),
    })
    .from(courses)
    .offset((Number(page) - 1) * ROWS_PER_PAGE)
    .limit(ROWS_PER_PAGE)
    .orderBy(desc(courses[sort]))
    .leftJoin(categories, eq(courses.categoryID, categories.id))
    .leftJoin(
      courseProgress,
      and(
        eq(courseProgress.courseID, courses.id),
        eq(courseProgress.userID, userId)
      )
    );

  if (search)
    query.where(
      or(
        like(courses.name, `%${search}%`),
        like(courses.description, `%${search}%`)
      )
    );

  const rows = await query.execute();

  return NextResponse.json(rows);
};
