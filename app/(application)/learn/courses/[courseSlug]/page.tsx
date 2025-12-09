import { CourseWithDetailProps, LessonWithProgressProps } from "@/lib/types";
import { notFound } from "next/navigation";
import { LessonCard } from "./components";
import Image from "next/image";
import LessonPop from "./components/LessonPop";
import { SelectionSyncProvider } from "./SelectionSyncContext";
import db from "@/db";
import { and, asc, eq, getTableColumns } from "drizzle-orm";
import {
  categories,
  courseProgress,
  courses,
  lessonProgress,
  lessons as lessonsTable,
} from "@/db/schema";
import { stackServerApp } from "@stack/server";

export default async function page({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;

  const user = await stackServerApp.getUser();
  if (!user) {
    return notFound();
  }

  const response = await db
    .select({
      ...getTableColumns(courses),
      category: getTableColumns(categories),
      progress: getTableColumns(courseProgress),
      lessons: getTableColumns(lessonsTable),
      lessonProgress: getTableColumns(lessonProgress),
    })
    .from(courses)
    .where(eq(courses.slug, courseSlug))
    .leftJoin(categories, eq(courses.categoryID, categories.id))
    .leftJoin(
      courseProgress,
      and(
        eq(courseProgress.userID, user.id),
        eq(courseProgress.courseID, courses.id)
      )
    )
    .leftJoin(lessonsTable, eq(lessonsTable.courseID, courses.id))
    .orderBy(asc(lessonsTable.unit), asc(lessonsTable.part))
    .leftJoin(
      lessonProgress,
      and(
        eq(lessonProgress.userID, user.id),
        eq(lessonProgress.courseID, courses.id),
        eq(lessonProgress.lessonID, lessonsTable.id)
      )
    );
  const courseDetail: CourseWithDetailProps = {
    ...response[0],
    lessons: response
      .filter((r) => r.lessons?.id)
      .map(
        (r): LessonWithProgressProps => ({
          ...r.lessons!,
          progress: r.lessonProgress,
        })
      ),
  };

  const { lessons, ...course } = courseDetail;

  if (!course || !course.id) {
    return notFound();
  }

  if (!lessons || lessons.length === 0) {
    return notFound();
  }

  return (
    <div className="flex gap-4 md:gap-10 flex-col md:flex-row">
      <div className="flex-5">
        <div className="sticky top-30">
          <div className="p-8 border-[3px] border-b-[6px] border-muted rounded-3xl">
            <Image
              src={course.image}
              alt={course.name}
              width={96}
              height={96}
              loading="lazy"
              className="float-right md:float-none"
            />
            <h1 className="md:my-6 text-2xl md:text-4xl font-bold text-balance">
              {course.name}
            </h1>
            <p className="my-3 md:my-6 text-card-foreground text-balance">
              {course.description}
            </p>
            <b>{course.lessonsCount} Lessons</b>
          </div>
        </div>
      </div>

      <SelectionSyncProvider>
        <div className="flex-6 flex flex-col mx-auto">
          {lessons.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              {...{ lesson, index }}
              isCompleted={lesson.progress ? true : false}
            />
          ))}
          <LessonPop />
        </div>
      </SelectionSyncProvider>
    </div>
  );
}
