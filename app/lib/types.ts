import {
  Courses,
  Categories,
  Lessons,
  NewCourses,
  CourseProgress,
  LessonProgress,
  NewCategories,
  NewLessons,
  NewLessonProgress,
  NewCourseProgress,
  UsersMirror,
  NewUsersMirror,
} from "@/db/schema";

// It's a bad act of me to import db types here just to export them with a new name
// TODO: Export them with the desired name from the original
export type CourseProps = Courses;
export type NewCourseProps = NewCourses;
export type LessonProps = Lessons;
export type NewLessonProps = NewLessons;
export type LessonProgressProps = LessonProgress;
export type NewLessonProgressProps = NewLessonProgress;
export type CategoryProps = Categories;
export type NewCategoryProps = NewCategories;
export type CourseProgressProps = CourseProgress;
export type NewCourseProgressProps = NewCourseProgress;
export type UsersMirrorProps = UsersMirror;
export type NewUsersMirrorProps = NewUsersMirror;

export type LessonWithProgressProps = Lessons & {
  progress: LessonProgressProps | null;
};

export type CourseWithCategoryProps = Courses & {
  category: Categories | null;
} & {
  progress: CourseProgressProps | null;
};
export type CourseWithDetailProps = CourseWithCategoryProps & {
  lessons: LessonWithProgressProps[];
};

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
  title: string;
  steps: Step[];
};
export type Step = {
  title: string;
  content: ({
    setAnswer,
  }: {
    setAnswer: (answer: number | undefined) => void;
  }) => React.ReactNode;
  answer: number | undefined;
};
