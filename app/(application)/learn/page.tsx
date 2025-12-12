"use client";

import useFetch from "@/lib/swr/useFetch";
import { CourseWithCategoryProps } from "@/lib/types";
import { CourseCard } from "@application/components";
import { useUser } from "@stackframe/stack";
import { notFound, useRouter } from "next/navigation";

export default function ApplicationPage() {
  const router = useRouter();
  const user = useUser();
  const { data: courses, isLoading } =
    useFetch<CourseWithCategoryProps[]>(`/api/courses`);

  if (!user) {
    router.push("/");
    return null;
  }

  // TODO: Show user a internet connection problem instead of notFound page
  if (!isLoading && !courses) return notFound();

  return (
    <div className="space-y-4 mb-20">
      <div>
        <h3 className="py-3 font-semibold text-xl">Continue learning</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading && <div>Loading...</div>}
          {courses &&
            courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
        </div>
      </div>
      <div>
        <h3 className="py-3 font-semibold text-xl">Recommended for you</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading && <div>Loading...</div>}
          {courses &&
            courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
        </div>
      </div>
    </div>
  );
}
