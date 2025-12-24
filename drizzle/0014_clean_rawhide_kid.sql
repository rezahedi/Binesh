CREATE TYPE "public"."roleEnumType" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TABLE "users_mirror" (
	"user_id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"image" text,
	"role" "roleEnumType" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users_mirror" ADD CONSTRAINT "users_mirror_user_id_users_sync_id_fk" FOREIGN KEY ("user_id") REFERENCES "neon_auth"."users_sync"("id") ON DELETE cascade ON UPDATE no action;