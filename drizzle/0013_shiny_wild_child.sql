ALTER TABLE "lesson_progress" ALTER COLUMN "time_spent" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "lesson_progress" ALTER COLUMN "resume_url" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "lesson_progress" ALTER COLUMN "progress_map" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "course_progress" ADD COLUMN "time_spent" integer DEFAULT 0 NOT NULL;