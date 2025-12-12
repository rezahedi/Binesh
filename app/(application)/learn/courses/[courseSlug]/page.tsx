"use client";

import { notFound, useParams } from "next/navigation";
import { LessonCard } from "./components";
import Image from "next/image";
import LessonPop from "./components/LessonPop";
import { SelectionSyncProvider } from "./SelectionSyncContext";
import useFetch from "@/lib/swr/useFetch";
import { CourseWithDetailProps } from "@/lib/types";
import CoursePageLoadingSkeleton from "./CoursePageLoadingSkeleton";

export default function CoursePage() {
  const { courseSlug } = useParams();
  const { data: courseDetail, isLoading } = useFetch<CourseWithDetailProps>(
    `/api/courses/${courseSlug}`
  );

  if (isLoading) return <CoursePageLoadingSkeleton />;

  if (
    !courseDetail ||
    !courseDetail.id ||
    !courseDetail.lessons ||
    courseDetail.lessons.length === 0
  )
    return notFound();

  const { lessons, ...course } = courseDetail;

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
