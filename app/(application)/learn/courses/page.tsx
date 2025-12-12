"use client";

import { CourseCard } from "@application/components";
import { CourseWithCategoryProps } from "@/lib/types";
import useFetch from "@/lib/swr/useFetch";
import { notFound } from "next/navigation";
import CoursesCardLoadingSkeleton from "../components/CoursesCardLoadingSkeleton";

export default function Page() {
  const { data: courses, isLoading } =
    useFetch<CourseWithCategoryProps[]>(`/api/courses`);

  // TODO: Show user a internet connection problem instead of notFound page
  if (!isLoading && !courses) return notFound();

  return (
    <div className="mb-20">
      <h3 className="font-semibold text-xl">Courses</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading && <CoursesCardLoadingSkeleton count={8} />}
        {courses &&
          courses.map((course) => <CourseCard key={course.id} {...course} />)}
      </div>
    </div>
  );
}
