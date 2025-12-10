CREATE TABLE "Categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"slug" text NOT NULL,
	"image" text NOT NULL,
	CONSTRAINT "Categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "CourseProgress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userID" text NOT NULL,
	"courseID" uuid NOT NULL,
	"percentage" integer NOT NULL,
	"resumeURL" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"slug" text NOT NULL,
	"image" text NOT NULL,
	"level" integer NOT NULL,
	"lessons_count" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"categoryID" uuid NOT NULL,
	CONSTRAINT "Courses_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "LessonProgress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userID" text NOT NULL,
	"lessonID" uuid NOT NULL,
	"progress" text NOT NULL,
	"resumeURL" text NOT NULL,
	"progressMap" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Lessons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"content" text NOT NULL,
	"slug" text NOT NULL,
	"unit" integer NOT NULL,
	"part" integer NOT NULL,
	"duration" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"courseID" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_userID_users_sync_id_fk" FOREIGN KEY ("userID") REFERENCES "neon_auth"."users_sync"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_courseID_Courses_id_fk" FOREIGN KEY ("courseID") REFERENCES "public"."Courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_categoryID_Categories_id_fk" FOREIGN KEY ("categoryID") REFERENCES "public"."Categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_userID_users_sync_id_fk" FOREIGN KEY ("userID") REFERENCES "neon_auth"."users_sync"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_lessonID_Lessons_id_fk" FOREIGN KEY ("lessonID") REFERENCES "public"."Lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_courseID_Courses_id_fk" FOREIGN KEY ("courseID") REFERENCES "public"."Courses"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "CourseProgress_userID_courseID_index" ON "CourseProgress" USING btree ("userID","courseID");--> statement-breakpoint
CREATE UNIQUE INDEX "LessonProgress_userID_lessonID_index" ON "LessonProgress" USING btree ("userID","lessonID");--> statement-breakpoint
CREATE UNIQUE INDEX "Lessons_courseID_slug_index" ON "Lessons" USING btree ("courseID","slug");