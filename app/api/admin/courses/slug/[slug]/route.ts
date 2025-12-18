import db from "@/db";
import { courses } from "@/db/schema";
import { withAdmin } from "@/lib/auth";
import { count, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = withAdmin(async ({ params }) => {
  const { slug } = await params;

  try {
    const rows = await db
      .select({ count: count() })
      .from(courses)
      .where(eq(courses.slug, slug));

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
