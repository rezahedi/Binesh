"use client";

import useCourses from "@/lib/swr/use-courses";
import { CourseCard } from "@application/components";

export default function ApplicationPage() {
  const { courses, isLoading } = useCourses();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="py-3 font-semibold text-xl">Continue learning</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading && <div>Loading...</div>}
          {courses &&
            courses.map((course, index) => (
              <CourseCard key={index} {...course} progress={10} />
            ))}
        </div>
      </div>
      <div>
        <h3 className="py-3 font-semibold text-xl">Recommended for you</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading && <div>Loading...</div>}
          {courses &&
            courses.map((course, index) => (
              <CourseCard key={index} {...course} progress={20} />
            ))}
        </div>
      </div>
      {/* <p>Signed in as {session.user && session.user.name}</p>
    <a href="/api/auth/signout">Sign out by link</a> */}
    </div>
  );
}
