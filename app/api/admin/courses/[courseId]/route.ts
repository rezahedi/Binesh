import db from "@/db";
import { courses } from "@/db/schema";
import { withAdmin } from "@/lib/auth";
import { CourseProps } from "@/lib/types";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = withAdmin(async ({ params }) => {
  const { courseId } = await params;

  try {
    const rows = await db
      .select()
      .from(courses)
      .where(eq(courses.id, courseId));

    if (!rows || rows.length === 0) {
      return new Response(null, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
});

export const PATCH = withAdmin(
  async ({ req, params }: { req: Request; params: Record<string, string> }) => {
    const { courseId } = await params;
    const body: CourseProps = await req.json();
    console.log("Patch body", body);

    try {
      const result = await db
        .update(courses)
        .set(body)
        .where(eq(courses.id, courseId));
      console.log("patch result", result);
      return new Response(null, { status: 204 });
    } catch (error) {
      console.error(error);
      return new Response(null, { status: 500 });
    }
  }
);

export const DELETE = withAdmin(async ({ params }) => {
  const { courseId } = params;

  try {
    const result = await db.delete(courses).where(eq(courses.id, courseId));
    console.log("delete result", result);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
});
