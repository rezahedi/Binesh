"use client";

import { notFound, useParams } from "next/navigation";
import { LessonCard } from "./components";
import Image from "next/image";
import LessonPop from "./components/LessonPop";
import { SelectionSyncProvider } from "./SelectionSyncContext";
import useFetch from "@/lib/swr/useFetch";
import { CourseWithDetailProps } from "@/lib/types";
import CoursePageLoadingSkeleton from "./CoursePageLoadingSkeleton";
import CourseCard from "./components/CourseCard";

export default function CoursePage() {
  const { courseSlug } = useParams();
  const { data: courseDetail, isLoading } = useFetch<CourseWithDetailProps>(
    `/api/courses/${courseSlug}`
  );

  if (isLoading) return <CoursePageLoadingSkeleton />;

  if (!courseDetail || !courseDetail.id) return notFound();

  const { lessons, ...course } = courseDetail;

  const nextLessonID = course.progress?.nextLessonID || lessons[0]?.id;

  return (
    <div className="flex gap-4 md:gap-10 flex-col md:flex-row">
      <div className="flex-5">
        <CourseCard course={course} />
      </div>

      <div className="flex-6 flex flex-col mx-auto w-full">
        {lessons.length === 0 && (
          <div className="self-center text-center my-10">
            <Image
              src={"/assets/ship-outline.svg"}
              width={300}
              height={300}
              alt="Outline ship"
              className="opacity-40"
            />
            <p className="font-semibold text-xl pt-10 text-muted-foreground">
              No lessons found.
            </p>
          </div>
        )}
        {lessons.length !== 0 && (
          <SelectionSyncProvider>
            {lessons.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                {...{ lesson, index }}
                isCompleted={lesson.progress ? true : false}
                locked={lesson.id !== nextLessonID}
              />
            ))}
            <LessonPop />
          </SelectionSyncProvider>
        )}
      </div>
    </div>
  );
}
