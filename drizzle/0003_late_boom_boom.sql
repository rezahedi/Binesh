ALTER TABLE "lessons" RENAME COLUMN "duration" TO "estimated_duration";--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "estimated_duration" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "exercises" integer DEFAULT 0 NOT NULL;