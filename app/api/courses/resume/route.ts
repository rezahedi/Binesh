import { NextResponse } from "next/server";
import { and, desc, eq, getTableColumns, isNotNull } from "drizzle-orm";
import db from "@/db";
import { categories, courseProgress, courses } from "@/db/schema";
import { stackServerApp } from "@stack/server";

export const GET = async () => {
  const TOTAL_ROWS = 10;

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
    .where(and(eq(courses.status, "published"), isNotNull(courseProgress.id)))
    .limit(TOTAL_ROWS)
    .orderBy(desc(courseProgress.updatedAt))
    .leftJoin(categories, eq(courses.categoryID, categories.id))
    .leftJoin(
      courseProgress,
      and(
        eq(courseProgress.userID, user.id),
        eq(courseProgress.courseID, courses.id)
      )
    );

  const rows = await query.execute();

  return NextResponse.json(rows);
};
