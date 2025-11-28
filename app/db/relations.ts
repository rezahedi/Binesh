import { relations } from "drizzle-orm/relations";
import { user, account, session, categories, courses, lessons, adminUsers, courseProgress, lessonProgress } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	adminUsers: many(adminUsers),
	courseProgresses: many(courseProgress),
	lessonProgresses: many(lessonProgress),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const coursesRelations = relations(courses, ({one, many}) => ({
	category: one(categories, {
		fields: [courses.categoryId],
		references: [categories.id]
	}),
	lessons: many(lessons),
	courseProgresses: many(courseProgress),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	courses: many(courses),
}));

export const lessonsRelations = relations(lessons, ({one, many}) => ({
	course: one(courses, {
		fields: [lessons.courseId],
		references: [courses.id]
	}),
	lessonProgresses: many(lessonProgress),
}));

export const adminUsersRelations = relations(adminUsers, ({one}) => ({
	user: one(user, {
		fields: [adminUsers.userId],
		references: [user.id]
	}),
}));

export const courseProgressRelations = relations(courseProgress, ({one}) => ({
	user: one(user, {
		fields: [courseProgress.userId],
		references: [user.id]
	}),
	course: one(courses, {
		fields: [courseProgress.courseId],
		references: [courses.id]
	}),
}));

export const lessonProgressRelations = relations(lessonProgress, ({one}) => ({
	user: one(user, {
		fields: [lessonProgress.userId],
		references: [user.id]
	}),
	lesson: one(lessons, {
		fields: [lessonProgress.lessonId],
		references: [lessons.id]
	}),
}));