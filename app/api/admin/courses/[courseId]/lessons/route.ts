import { NextResponse } from "next/server";
import { and, asc, eq, getTableColumns, like, or } from "drizzle-orm";
import db from "@/db";
import { lessons, courses, NewLessons, StatusType } from "@/db/schema";
import { getSearchParams } from "@/utils/urls";
import { withAdmin } from "@/lib/auth";

export const GET = withAdmin(
  async ({ req, params }: { req: Request; params: Record<string, string> }) => {
    const { courseId } = await params;
    const searchParams = getSearchParams(req.url);
    const {
      search,
      status,
      sort = "unit",
    } = searchParams as {
      search?: string;
      status?: StatusType;
      sort?: "unit" | "part" | "name" | "createdAt" | "updatedAt";
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
  const body: NewLessons = await req.json();
  console.log("Post body", body);

  try {
    const result = await db
      .insert(lessons)
      .values({ ...body, courseID: courseId });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
});
