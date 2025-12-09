ALTER TABLE "Categories" RENAME TO "categories";--> statement-breakpoint
ALTER TABLE "CourseProgress" RENAME TO "course_progress";--> statement-breakpoint
ALTER TABLE "Courses" RENAME TO "courses";--> statement-breakpoint
ALTER TABLE "LessonProgress" RENAME TO "lesson_progress";--> statement-breakpoint
ALTER TABLE "Lessons" RENAME TO "lessons";--> statement-breakpoint
ALTER TABLE "course_progress" RENAME COLUMN "userID" TO "user_id";--> statement-breakpoint
ALTER TABLE "course_progress" RENAME COLUMN "courseID" TO "course_id";--> statement-breakpoint
ALTER TABLE "course_progress" RENAME COLUMN "resumeURL" TO "resume_url";--> statement-breakpoint
ALTER TABLE "course_progress" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "course_progress" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "categoryID" TO "category_id";--> statement-breakpoint
ALTER TABLE "lesson_progress" RENAME COLUMN "userID" TO "user_id";--> statement-breakpoint
ALTER TABLE "lesson_progress" RENAME COLUMN "lessonID" TO "lesson_id";--> statement-breakpoint
ALTER TABLE "lesson_progress" RENAME COLUMN "resumeURL" TO "resume_url";--> statement-breakpoint
ALTER TABLE "lesson_progress" RENAME COLUMN "progressMap" TO "progress_map";--> statement-breakpoint
ALTER TABLE "lesson_progress" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "lesson_progress" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "lessons" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "lessons" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "lessons" RENAME COLUMN "courseID" TO "course_id";--> statement-breakpoint
ALTER TABLE "categories" DROP CONSTRAINT "Categories_slug_unique";--> statement-breakpoint
ALTER TABLE "courses" DROP CONSTRAINT "Courses_slug_unique";--> statement-breakpoint
ALTER TABLE "course_progress" DROP CONSTRAINT "CourseProgress_userID_users_sync_id_fk";
--> statement-breakpoint
ALTER TABLE "course_progress" DROP CONSTRAINT "CourseProgress_courseID_Courses_id_fk";
--> statement-breakpoint
ALTER TABLE "courses" DROP CONSTRAINT "Courses_categoryID_Categories_id_fk";
--> statement-breakpoint
ALTER TABLE "lesson_progress" DROP CONSTRAINT "LessonProgress_userID_users_sync_id_fk";
--> statement-breakpoint
ALTER TABLE "lesson_progress" DROP CONSTRAINT "LessonProgress_lessonID_Lessons_id_fk";
--> statement-breakpoint
ALTER TABLE "lessons" DROP CONSTRAINT "Lessons_courseID_Courses_id_fk";
--> statement-breakpoint
DROP INDEX "CourseProgress_userID_courseID_index";--> statement-breakpoint
DROP INDEX "LessonProgress_userID_lessonID_index";--> statement-breakpoint
DROP INDEX "Lessons_courseID_slug_index";--> statement-breakpoint
ALTER TABLE "course_progress" ADD CONSTRAINT "course_progress_user_id_users_sync_id_fk" FOREIGN KEY ("user_id") REFERENCES "neon_auth"."users_sync"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_progress" ADD CONSTRAINT "course_progress_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_user_id_users_sync_id_fk" FOREIGN KEY ("user_id") REFERENCES "neon_auth"."users_sync"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "course_progress_user_id_course_id_index" ON "course_progress" USING btree ("user_id","course_id");--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_progress_user_id_lesson_id_index" ON "lesson_progress" USING btree ("user_id","lesson_id");--> statement-breakpoint
CREATE UNIQUE INDEX "lessons_course_id_slug_index" ON "lessons" USING btree ("course_id","slug");--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_slug_unique" UNIQUE("slug");