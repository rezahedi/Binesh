import { usersSync } from "drizzle-orm/neon";
import { relations } from "drizzle-orm/relations";
import {
  categories,
  courses,
  lessons,
  courseProgress,
  lessonProgress,
} from "./schema";

export const categoriesRelations = relations(categories, ({ many }) => ({
  courses: many(courses),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  category: one(categories, {
    fields: [courses.categoryID],
    references: [categories.id],
  }),
  lessons: many(lessons),
  progresses: many(courseProgress),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  course: one(courses, {
    fields: [lessons.courseID],
    references: [courses.id],
  }),
  progresses: many(lessonProgress),
}));

export const courseProgressRelations = relations(courseProgress, ({ one }) => ({
  user: one(usersSync, {
    fields: [courseProgress.userID],
    references: [usersSync.id],
  }),
  course: one(courses, {
    fields: [courseProgress.courseID],
    references: [courses.id],
  }),
}));

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
  user: one(usersSync, {
    fields: [lessonProgress.userID],
    references: [usersSync.id],
  }),
  lesson: one(lessons, {
    fields: [lessonProgress.lessonID],
    references: [lessons.id],
  }),
}));
