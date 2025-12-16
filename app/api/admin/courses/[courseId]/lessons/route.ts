import { NextResponse } from "next/server";
import { and, asc, eq, getTableColumns, like, or } from "drizzle-orm";
import db from "@/db";
import { lessons, courses } from "@/db/schema";
import { getSearchParams } from "@/utils/urls";
import { withAdmin } from "@/lib/auth";

export const GET = withAdmin(
  async ({ req, params }: { req: Request; params: Record<string, string> }) => {
    const { courseId } = await params;
    const searchParams = getSearchParams(req.url);
    const ROWS_PER_PAGE = 10;
    const {
      search,
      sort = "unit",
      page = "1",
    } = searchParams as {
      search?: string;
      sort?: "unit" | "part" | "name" | "createdAt" | "updatedAt";
      page?: string;
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
        .offset((Number(page) - 1) * ROWS_PER_PAGE)
        .limit(ROWS_PER_PAGE)
        .orderBy(asc(lessons[sort]));

      let searchConditions;
      if (search)
        searchConditions = or(
          like(lessons.name, `%${search}%`),
          like(lessons.description, `%${search}%`)
        );

      query.where(and(eq(lessons.courseID, courseId), searchConditions));

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
