CREATE TYPE "public"."statusEnumType" AS ENUM('draft', 'reviewing', 'published', 'archived');--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "status" "statusEnumType" DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "lessons" ADD COLUMN "status" "statusEnumType" DEFAULT 'draft' NOT NULL;