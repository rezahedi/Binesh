"use client";

import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import CoursesSection from "./components/CoursesSection";
import CategorySection from "./components/CategorySection";

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
      <CategorySection categoryId="a7a01c82-a272-4373-986f-588b6f8255ec" />
      <CategorySection categoryId="7f9940ec-4981-4eb9-89ed-6a19592358ed" />
      <CategorySection categoryId="5edc506c-ada1-4cbe-ac5b-32531feb2752" />
    </div>
  );
}
