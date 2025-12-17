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
  image: text("image").notNull(),
});

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  slug: text("slug").notNull().unique(),
  image: text("image").notNull(),
  level: integer("level").notNull(),
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
    description: text("description").notNull(),
    content: text("content").notNull(),
    slug: text("slug").notNull(),
    unit: integer("unit").notNull(),
    part: integer("part").notNull(),
    exercises: integer("exercises").notNull().default(0),
    estimatedDuration: integer("estimated_duration").notNull(),
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
    percentage: integer("percentage").notNull(),
    resumeURL: text("resume_url").notNull(),
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
    timeSpent: integer("time_spent").notNull(),
    resumeURL: text("resume_url").notNull(),
    progressMap: text("progress_map").notNull(),
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
