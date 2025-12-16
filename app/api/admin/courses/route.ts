import { NextResponse } from "next/server";
import { count, desc, eq, getTableColumns, like, or } from "drizzle-orm";
import db from "@/db";
import { courses, categories } from "@/db/schema";
import { getSearchParams } from "@/utils/urls";
import { withAdmin } from "@/lib/auth";
import { CourseProps } from "@/lib/types";
import { ROWS_PER_PAGE } from "@/constants/dashboard";

export const GET = withAdmin(async ({ req }: { req: Request }) => {
  const searchParams = getSearchParams(req.url);
  const {
    search,
    sort = "createdAt",
    page = "1",
  } = searchParams as {
    search?: string;
    sort?: "createdAt" | "updatedAt";
    page?: string;
  };

  const query = db
    .select({
      ...getTableColumns(courses),
      category: getTableColumns(categories),
    })
    .from(courses)
    .offset((Number(page) - 1) * ROWS_PER_PAGE)
    .limit(ROWS_PER_PAGE)
    .orderBy(desc(courses[sort]))
    .leftJoin(categories, eq(courses.categoryID, categories.id));

  const countQuery = db.select({ count: count() }).from(courses);

  if (search) {
    const whereClause = or(
      like(courses.name, `%${search}%`),
      like(courses.description, `%${search}%`)
    );
    query.where(whereClause);
    countQuery.where(whereClause);
  }

  const rows = await query.execute();
  const countRows = await countQuery.execute();

  return NextResponse.json({
    count: countRows[0].count,
    rows,
  });
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
