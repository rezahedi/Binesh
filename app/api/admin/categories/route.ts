import { NextResponse } from "next/server";
import db from "@/db";
import { categories, courses } from "@/db/schema";
import { withAdmin } from "@/lib/auth";
import { NewCategoryProps } from "@/lib/types";
import { count, eq, getTableColumns } from "drizzle-orm";

export const GET = withAdmin(async () => {
  const rows = await db
    .select({ ...getTableColumns(categories), coursesCount: count(courses.id) })
    .from(categories)
    .leftJoin(courses, eq(categories.id, courses.categoryID))
    .groupBy(categories.id);

  return NextResponse.json(rows);
});

export const POST = withAdmin(async ({ req }: { req: Request }) => {
  const body: NewCategoryProps = await req.json();
  console.log("insert body", body);

  try {
    const result = await db.insert(categories).values(body);
    console.log("insert result", result);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
});
