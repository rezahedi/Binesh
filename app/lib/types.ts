import { Courses, Categories } from "@prisma/client";

export type CourseProps = Courses;
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
