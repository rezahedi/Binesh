import { NextResponse } from "next/server";
import { and, desc, eq, getTableColumns, like, or } from "drizzle-orm";
import db from "@/db";
import { courses, categories, courseProgress } from "@/db/schema";
import { getSearchParams } from "@/utils/urls";
import { stackServerApp } from "@stack/server";
import { withAdmin } from "@/lib/auth";
import { CourseProps } from "@/lib/types";

export const GET = withAdmin(async ({ req }: { req: Request }) => {
  const searchParams = getSearchParams(req.url);
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

  if (search)
    query.where(
      or(
        like(courses.name, `%${search}%`),
        like(courses.description, `%${search}%`)
      )
    );

  const rows = await query.execute();

  return NextResponse.json(rows);
});

export const POST = withAdmin(async ({ req }: { req: Request }) => {
  const body: CourseProps = await req.json();
  console.log("insert body", body);

  try {
    const result = await db.insert(courses).values(body);
    console.log("insert result", result);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
});
