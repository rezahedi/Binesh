import { NextResponse } from "next/server";
import {
  and,
  asc,
  count,
  eq,
  getTableColumns,
  like,
  or,
  sql,
} from "drizzle-orm";
import db from "@/db";
import { lessons, courses, StatusType } from "@/db/schema";
import { getSearchParams } from "@/utils/urls";
import { withAdmin } from "@/lib/auth";
import { parseLesson } from "@/lib/quizParser";
import { NewLessonProps } from "@/lib/types";

export const GET = withAdmin(
  async ({ req, params }: { req: Request; params: Record<string, string> }) => {
    const { courseId } = await params;
    const searchParams = getSearchParams(req.url);
    const {
      search,
      status,
      sort = "sequence",
    } = searchParams as {
      search?: string;
      status?: StatusType;
      sort?: "sequence" | "unit" | "part" | "name" | "createdAt" | "updatedAt";
    };

    try {
      // Get course
      const courseRows = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId));

      if (!courseRows || courseRows.length === 0) {
        return new Response(null, { status: 404 });
      }

      // Get course's lessons
      const { content: _content, ...lessonsColumns } = getTableColumns(lessons);
      void _content;

      const query = db
        .select(lessonsColumns)
        .from(lessons)
        .orderBy(asc(lessons[sort]));

      const clauses = [];
      if (search)
        clauses.push(
          or(
            like(lessons.name, `%${search}%`),
            like(lessons.description, `%${search}%`)
          )
        );
      if (status) clauses.push(eq(lessons.status, status));

      query.where(and(eq(lessons.courseID, courseId), ...clauses));

      const lessonRows = await query.execute();

      return NextResponse.json({
        course: courseRows[0],
        lessons: lessonRows,
      });
    } catch (error) {
      console.error(error);
      return new Response(null, { status: 500 });
    }
  }
);

export const POST = withAdmin(async ({ req, params }) => {
  const { courseId } = await params;
  const body: NewLessonProps = await req.json();

  try {
    const { steps } = parseLesson(body.content || "");
    const part = steps.length;
    const exercises = steps.filter((s) => s.quiz !== null).length;
    const estimatedDuration = part * 2 + exercises * 4;

    const insertDTO: NewLessonProps = {
      name: body.name,
      slug: body.slug,
      description: body.description,
      content: body.content,
      status: body.status,
      unit: body.unit,
      part,
      estimatedDuration,
      exercises,
      courseID: courseId,
    };

    const result = await db.insert(lessons).values(insertDTO);

    if (body.status === "published") await updateCourseStats(courseId);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
});

// TODO: It's not the best solution, refactor it later
export const updateCourseStats = async (courseId: string) => {
  const [aggregations] = await db
    .select({
      lessonsCount: count(),
      part: sql<number>`COALESCE(SUM(${lessons.part}), 0)`,
      exercises: sql<number>`COALESCE(SUM(${lessons.exercises}), 0)`,
      estimatedDuration: sql<number>`COALESCE(SUM(${lessons.estimatedDuration}), 0)`,
    })
    .from(lessons)
    .where(
      and(eq(lessons.status, "published"), eq(lessons.courseID, courseId))
    );

  await db
    .update(courses)
    .set({
      lessonsCount: aggregations.lessonsCount,
      part: aggregations.part,
      exercises: aggregations.exercises,
      estimatedDuration: aggregations.estimatedDuration,
    })
    .where(eq(courses.id, courseId));
};
