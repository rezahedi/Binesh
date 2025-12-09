DROP INDEX "lesson_progress_user_id_lesson_id_index";--> statement-breakpoint
ALTER TABLE "lesson_progress" ADD COLUMN "course_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "lesson_progress" ADD COLUMN "score" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "lesson_progress" ADD COLUMN "time_spent" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_progress_user_id_course_id_lesson_id_index" ON "lesson_progress" USING btree ("user_id","course_id","lesson_id");--> statement-breakpoint
ALTER TABLE "lesson_progress" DROP COLUMN "progress";