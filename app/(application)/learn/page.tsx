"use client";

import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import CoursesSection from "./components/CoursesSection";

export default function ApplicationPage() {
  const router = useRouter();
  const user = useUser();

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <div className="space-y-4 mb-20">
      <CoursesSection title="Continue learning" apiUrl="/api/courses/resume" />
      <CoursesSection title="Recommended for you" apiUrl="/api/courses" />
    </div>
  );
}
