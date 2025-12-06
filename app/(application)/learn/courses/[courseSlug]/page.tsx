import { CourseWithDetailProps } from "@/lib/types";
import { notFound } from "next/navigation";
import { LessonCard } from "./components";
import Image from "next/image";
import LessonPop from "./components/LessonPop";
import { SelectionSyncProvider } from "./SelectionSyncContext";

export default async function page({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;

  // fetch courses from /api/admin/courses
  const courseDetail: CourseWithDetailProps = await fetch(
    "http://localhost:3000/api/courses/" + courseSlug,
    { method: "GET" }
  ).then(async (res) => {
    if (res.status === 200) {
      return await res.json();
    }
  });

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
            <LessonCard key={lesson.id} {...{ lesson, index }} />
          ))}
          <LessonPop />
        </div>
      </SelectionSyncProvider>
    </div>
  );
}
