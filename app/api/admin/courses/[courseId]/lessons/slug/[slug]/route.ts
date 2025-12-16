import db from "@/db";
import { lessons } from "@/db/schema";
import { withAdmin } from "@/lib/auth";
import { and, count, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = withAdmin(async ({ params }) => {
  const { courseId, slug } = await params;

  try {
    const rows = await db
      .select({ count: count() })
      .from(lessons)
      .where(and(eq(lessons.courseID, courseId), eq(lessons.slug, slug)));

    if (rows.length === 0) {
      return new Response(null, { status: 500 });
    }

    const slugIsUnique = rows[0].count === 0 ? 1 : 0;
    return new NextResponse(String(slugIsUnique));
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
});
