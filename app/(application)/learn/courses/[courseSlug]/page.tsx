import {CourseProps, LessonsProps} from "@/lib/types";
import {notFound} from "next/navigation";
import {LessonCard} from "./components";

export default async function page({params}: {params: {courseSlug: string}}) {
  const {courseSlug} = params;

  // fetch courses from /api/admin/courses
  const course: CourseProps = await fetch(
    "http://localhost:3000/api/admin/courses/" + courseSlug,
    {method: "GET"}
  ).then(async (res) => {
    if (res.status === 200) {
      return await res.json();
    }
  });

  if (!course || !course.id) {
    return notFound();
  }

  // fetch lessons from /api/admin/courses/[courseSlug]/lessons
  const lessons: LessonsProps[] = await fetch(
    "http://localhost:3000/api/admin/courses/" + courseSlug + "/lessons",
    {method: "GET"}
  ).then(async (res) => {
    if (res.status === 200) {
      return await res.json();
    }
  });

  if (!lessons || lessons.length === 0) {
    return notFound();
  }

  return (
    <div className="container flex gap-10 flex-col md:flex-row">
      <div className="flex-1">
        <div className="sticky top-10">
          <a href="./" className="inline-block py-4">
            &lt;- Courses
          </a>

          <div className="md:mt-10 md:p-8 md:border border-gray-200 rounded-lg">
            <img
              src={course.image}
              alt={course.name}
              width={96}
              height={96}
              loading="lazy"
              className="float-right md:float-none"
            />
            <h1 className="md:my-6 text-2xl md:text-4xl font-bold text-balance">
              Course: {course.name}
            </h1>
            <p className="my-3 md:my-6 text-gray-700 text-balance">
              {course.description}
            </p>
            <b>{course.lessens} Lessons</b>
          </div>
        </div>
      </div>

      <div
        className="flex-1 py-24 h-[2000px]"
        style={{
          backgroundImage: "url('/assets/lesson-path-bg-pattern.svg')",
          backgroundPositionY: "0",
          backgroundSize: "100% auto",
          backgroundRepeat: "repeat",
        }}
      >
        <b>Lessons:</b>
        <div className="flex flex-col w-[454px] mx-auto">
          {lessons.map((lesson, index) => (
            <LessonCard key={lesson.id} {...{lesson, index, courseSlug}} />
          ))}
        </div>
      </div>
    </div>
  );
}
