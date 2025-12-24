import { usersSync } from "drizzle-orm/neon";
import {
  pgTable,
  timestamp,
  text,
  integer,
  uniqueIndex,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

export const STATUS_VALUES = [
  "draft",
  "reviewing",
  "published",
  "archived",
] as const;

export type StatusType = (typeof STATUS_VALUES)[number];

export const statusEnum = pgEnum("statusEnumType", STATUS_VALUES);

export const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced"] as const;

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  slug: text("slug").notNull().unique(),
  image: text("image").notNull().default(""),
});

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  slug: text("slug").notNull().unique(),
  image: text("image").notNull().default(""),
  level: integer("level").notNull().default(0),
  lessonsCount: integer("lessons_count").notNull().default(0),
  part: integer("part").notNull().default(0),
  estimatedDuration: integer("estimated_duration").notNull().default(0),
  exercises: integer("exercises").notNull().default(0),
  status: statusEnum("status").notNull().default("draft"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
  categoryID: uuid("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "restrict" }),
});

export const lessons = pgTable(
  "lessons",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull().default(""),
    content: text("content").notNull().default(""),
    slug: text("slug").notNull(),
    sequence: integer("sequence").notNull().default(0),
    unit: integer("unit").notNull().default(1),
    part: integer("part").notNull().default(0),
    exercises: integer("exercises").notNull().default(0),
    estimatedDuration: integer("estimated_duration").notNull().default(0),
    status: statusEnum("status").notNull().default("draft"),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    courseID: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "restrict" }),
  },
  (table) => [uniqueIndex().on(table.courseID, table.slug)]
);

export const courseProgress = pgTable(
  "course_progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userID: text("user_id")
      .notNull()
      .references(() => usersSync.id, { onDelete: "cascade" }),
    courseID: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    timeSpent: integer("time_spent").notNull().default(0),
    percentage: integer("percentage").notNull(),
    resumeURL: text("resume_url").notNull(),
    nextLessonID: uuid("next_lesson_id"),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    // Unique: user can have one progress row per course
    uniqueIndex().on(table.userID, table.courseID),
  ]
);

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userID: text("user_id")
      .notNull()
      .references(() => usersSync.id, { onDelete: "cascade" }),
    courseID: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    lessonID: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    score: integer("score").notNull().default(0),
    timeSpent: integer("time_spent").notNull().default(0),
    resumeURL: text("resume_url").notNull().default(""),
    progressMap: text("progress_map").notNull().default("{}"),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    // Unique: user can have one progress row per lesson per course
    uniqueIndex().on(table.userID, table.courseID, table.lessonID),
  ]
);

export type Categories = typeof categories.$inferSelect;
export type Courses = typeof courses.$inferSelect;
export type Lessons = typeof lessons.$inferSelect;
export type CourseProgress = typeof courseProgress.$inferSelect;
export type LessonProgress = typeof lessonProgress.$inferSelect;

export type NewCategories = typeof categories.$inferInsert;
export type NewCourses = typeof courses.$inferInsert;
export type NewLessons = typeof lessons.$inferInsert;
export type NewCourseProgress = typeof courseProgress.$inferInsert;
export type NewLessonProgress = typeof lessonProgress.$inferInsert;
