"use client";

import { CourseCard } from "@application/components";
import useCourses from "@/lib/swr/use-courses";

export default function Page() {
  const { courses, isLoading } = useCourses();

  return (
    <div>
      <h3 className="font-semibold text-xl">Courses</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading && <div>Loading...</div>}
        {courses &&
          courses.map((course) => (
            <CourseCard key={course.id} {...course} progress={60} />
          ))}
      </div>
    </div>
  );
}
