import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, getTableColumns, like, or } from "drizzle-orm";
import db from "@/db";
import { categories, courseProgress, courses } from "@/db/schema";
import { getSearchParams } from "@/utils/urls";
import { stackServerApp } from "@stack/server";

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

  const user = await stackServerApp.getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

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
        eq(courseProgress.userID, user.id),
        eq(courseProgress.courseID, courses.id)
      )
    );

  const clauses = [];
  clauses.push(eq(courses.status, "published"));

  if (search)
    clauses.push(
      or(
        like(courses.name, `%${search}%`),
        like(courses.description, `%${search}%`)
      )
    );

  query.where(and(...clauses));

  const rows = await query.execute();

  return NextResponse.json(rows);
};
