import { LessonsProps } from "@/lib/types";
import db from "@/db";
import { lessons } from "@/db/schema";
import { withAdmin } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { updateCourseStats } from "../route";
import { parseLesson } from "@/lib/quizParser";

export const GET = withAdmin(async ({ params }) => {
  const { lessonId } = await params;

  try {
    const rows = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, lessonId));

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
    const { courseId, lessonId } = await params;
    const body: LessonsProps = await req.json();
    console.log("Patch body", body);

    try {
      const { steps } = parseLesson(body.content);
      const part = steps.length;
      const exercises = steps.filter((s) => s.quiz !== null).length;
      const estimatedDuration = part * 2 + exercises * 4;

      const result = await db
        .update(lessons)
        .set({ ...body, part, exercises, estimatedDuration })
        .where(eq(lessons.id, lessonId));

      if (result.rowCount === 0) return new Response(null, { status: 404 });

      await updateCourseStats(courseId);

      return new Response(null, { status: 204 });
    } catch (error) {
      console.error(error);
      return new Response(null, { status: 500 });
    }
  }
);

export const DELETE = withAdmin(async ({ params }) => {
  const { courseId, lessonId } = await params;

  try {
    const result = await db.delete(lessons).where(eq(lessons.id, lessonId));

    // If didn't delete anything
    if (result.rowCount === 0) return new Response(null, { status: 404 });

    await updateCourseStats(courseId);

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
});
