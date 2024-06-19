import { Courses, Categories, Lessons } from "@prisma/client";

export type CourseProps = Courses;
export type LessonsProps = Lessons;
export type CategoryProps = Categories;

export const roles = ["admin", "editor"] as const;

export type RoleProps = (typeof roles)[number];

export interface UserProps {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
  role: RoleProps;
  projects?: { projectId: string }[];
}

export type Part = {
  title: string,
  steps: Step[],
}
export type Step = {
  title: string,
  content: ( { setAnswer }: { setAnswer: (answer: number | undefined) => void } ) => React.ReactNode,
  answer: number | undefined,
}