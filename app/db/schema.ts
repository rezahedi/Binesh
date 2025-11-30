import {
  pgTable,
  timestamp,
  text,
  integer,
  uniqueIndex,
  foreignKey,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const role = pgEnum("Role", ["admin", "editor"]);

export const verificationToken = pgTable(
  "VerificationToken",
  {
    identifier: text().notNull(),
    token: text().notNull(),
    expires: timestamp({ precision: 3, mode: "string" }).notNull(),
  },
  (table) => [
    uniqueIndex("VerificationToken_identifier_token_key").using(
      "btree",
      table.identifier.asc().nullsLast().op("text_ops"),
      table.token.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("VerificationToken_token_key").using(
      "btree",
      table.token.asc().nullsLast().op("text_ops")
    ),
  ]
);

export const account = pgTable(
  "Account",
  {
    id: text().primaryKey().notNull(),
    userId: text().notNull(),
    type: text().notNull(),
    provider: text().notNull(),
    providerAccountId: text().notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text(),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (table) => [
    uniqueIndex("Account_provider_providerAccountId_key").using(
      "btree",
      table.provider.asc().nullsLast().op("text_ops"),
      table.providerAccountId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "Account_userId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ]
);

export const session = pgTable(
  "Session",
  {
    id: text().primaryKey().notNull(),
    sessionToken: text().notNull(),
    userId: text().notNull(),
    expires: timestamp({ precision: 3, mode: "string" }).notNull(),
  },
  (table) => [
    uniqueIndex("Session_sessionToken_key").using(
      "btree",
      table.sessionToken.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "Session_userId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ]
);

export const categories = pgTable(
  "Categories",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    description: text().notNull(),
    slug: text().notNull(),
    image: text().notNull(),
  },
  (table) => [
    uniqueIndex("Categories_slug_key").using(
      "btree",
      table.slug.asc().nullsLast().op("text_ops")
    ),
  ]
);

export const courses = pgTable(
  "Courses",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    description: text().notNull(),
    slug: text().notNull(),
    image: text().notNull(),
    level: integer().notNull(),
    lessens: integer().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
    categoryID: text().notNull(),
  },
  (table) => [
    uniqueIndex("Courses_slug_key").using(
      "btree",
      table.slug.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.categoryID],
      foreignColumns: [categories.id],
      name: "Courses_categoryID_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

export const lessons = pgTable(
  "Lessons",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    description: text().notNull(),
    slug: text().notNull(),
    unit: integer().notNull(),
    part: integer().notNull(),
    duration: integer().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
    courseId: text().notNull(),
  },
  (table) => [
    uniqueIndex("Lessons_courseID_slug_key").using(
      "btree",
      table.courseId.asc().nullsLast().op("text_ops"),
      table.slug.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.courseId],
      foreignColumns: [courses.id],
      name: "Lessons_courseID_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

export const adminUsers = pgTable(
  "AdminUsers",
  {
    id: text().primaryKey().notNull(),
    role: role().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
    userId: text().notNull(),
  },
  (table) => [
    uniqueIndex("AdminUsers_userId_key").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "AdminUsers_userId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ]
);

export const user = pgTable(
  "User",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: timestamp({ precision: 3, mode: "string" }),
    image: text(),
    timezone: text().default("America/Los_Angeles").notNull(),
    league: text().default("bronze").notNull(),
    points: integer().default(10).notNull(),
    streak: integer().default(0).notNull(),
    learningGoal: integer().default(1).notNull(),
    username: text().notNull(),
  },
  (table) => [
    uniqueIndex("User_email_key").using(
      "btree",
      table.email.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("User_username_key").using(
      "btree",
      table.username.asc().nullsLast().op("text_ops")
    ),
  ]
);

export const courseProgress = pgTable(
  "CourseProgress",
  {
    id: text().primaryKey().notNull(),
    userId: text().notNull(),
    courseId: text().notNull(),
    percentage: integer().notNull(),
    resumeUrl: text().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
  },
  (table) => [
    uniqueIndex("CourseProgress_userID_courseID_key").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops"),
      table.courseId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "CourseProgress_userID_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.courseId],
      foreignColumns: [courses.id],
      name: "CourseProgress_courseID_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ]
);

export const lessonProgress = pgTable(
  "LessonProgress",
  {
    id: text().primaryKey().notNull(),
    userId: text().notNull(),
    lessonId: text().notNull(),
    progress: text().notNull(),
    resumeUrl: text().notNull(),
    progressMap: text().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
  },
  (table) => [
    uniqueIndex("LessonProgress_userID_lessonID_key").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops"),
      table.lessonId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "LessonProgress_userID_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.lessonId],
      foreignColumns: [lessons.id],
      name: "LessonProgress_lessonID_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ]
);

export type VerificationToken = typeof verificationToken.$inferSelect;
export type Account = typeof account.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Categories = typeof categories.$inferSelect;
export type Courses = typeof courses.$inferSelect;
export type Lessons = typeof lessons.$inferSelect;
export type AdminUsers = typeof adminUsers.$inferSelect;
export type User = typeof user.$inferSelect;
export type CourseProgress = typeof courseProgress.$inferSelect;
export type LessonProgress = typeof lessonProgress.$inferSelect;

export type NewVerificationToken = typeof verificationToken.$inferInsert;
export type NewAccount = typeof account.$inferInsert;
export type NewSession = typeof session.$inferInsert;
export type NewCategories = typeof categories.$inferInsert;
export type NewCourses = typeof courses.$inferInsert;
export type NewLessons = typeof lessons.$inferInsert;
export type NewAdminUsers = typeof adminUsers.$inferInsert;
export type NewUser = typeof user.$inferInsert;
export type NewCourseProgress = typeof courseProgress.$inferInsert;
export type NewLessonProgress = typeof lessonProgress.$inferInsert;
