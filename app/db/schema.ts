import { usersSync } from "drizzle-orm/neon";
import {
  pgTable,
  timestamp,
  text,
  integer,
  uniqueIndex,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";

export const role = pgEnum("Role", ["admin", "editor"]);

export const categories = pgTable("Categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  slug: text("slug").notNull().unique(),
  image: text("image").notNull(),
});

export const courses = pgTable("Courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  slug: text("slug").notNull().unique(),
  image: text("image").notNull(),
  level: integer("level").notNull(),
  lessonsCount: integer("lessons_count").notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).defaultNow().notNull(),
  categoryID: uuid("categoryID")
    .notNull()
    .references(() => categories.id, { onDelete: "restrict" }),
});

export const lessons = pgTable(
  "Lessons",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    content: text("content").notNull(),
    slug: text("slug").notNull(),
    unit: integer("unit").notNull(),
    part: integer("part").notNull(),
    duration: integer("duration").notNull(),
    createdAt: timestamp("createdAt", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { mode: "string" })
      .defaultNow()
      .notNull(),
    courseID: uuid("courseID")
      .notNull()
      .references(() => courses.id, { onDelete: "restrict" }),
  },
  (table) => [uniqueIndex().on(table.courseID, table.slug)]
);

export const courseProgress = pgTable(
  "CourseProgress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userID: text("userID")
      .notNull()
      .references(() => usersSync.id, { onDelete: "cascade" }),
    courseID: uuid("courseID")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    percentage: integer("percentage").notNull(),
    resumeURL: text("resumeURL").notNull(),
    createdAt: timestamp("createdAt", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    // Unique: user can have one progress row per lesson
    uniqueIndex().on(table.userID, table.courseID),
  ]
);

export const lessonProgress = pgTable(
  "LessonProgress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userID: text("userID")
      .notNull()
      .references(() => usersSync.id, { onDelete: "cascade" }),
    lessonID: uuid("lessonID")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    progress: text("progress").notNull(),
    resumeURL: text("resumeURL").notNull(),
    progressMap: text("progressMap").notNull(),
    createdAt: timestamp("createdAt", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    // Unique: user can have one progress row per lesson
    uniqueIndex().on(table.userID, table.lessonID),
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
