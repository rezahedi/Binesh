ALTER TABLE "users_mirror" ALTER COLUMN "name" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "users_mirror" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users_mirror" ALTER COLUMN "email" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "users_mirror" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users_mirror" ALTER COLUMN "image" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "users_mirror" ALTER COLUMN "image" SET NOT NULL;