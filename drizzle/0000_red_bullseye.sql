-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."Role" AS ENUM('admin', 'editor');--> statement-breakpoint
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "VerificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "Session" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionToken" text NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"slug" text NOT NULL,
	"image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Courses" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"slug" text NOT NULL,
	"image" text NOT NULL,
	"level" integer NOT NULL,
	"lessens" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"categoryID" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Lessons" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"slug" text NOT NULL,
	"unit" integer NOT NULL,
	"part" integer NOT NULL,
	"duration" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"courseID" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "AdminUsers" (
	"id" text PRIMARY KEY NOT NULL,
	"role" "Role" NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" timestamp(3),
	"image" text,
	"timezone" text DEFAULT 'America/Los_Angeles' NOT NULL,
	"league" text DEFAULT 'bronze' NOT NULL,
	"points" integer DEFAULT 10 NOT NULL,
	"streak" integer DEFAULT 0 NOT NULL,
	"learningGoal" integer DEFAULT 1 NOT NULL,
	"username" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "CourseProgress" (
	"id" text PRIMARY KEY NOT NULL,
	"userID" text NOT NULL,
	"courseID" text NOT NULL,
	"percentage" integer NOT NULL,
	"resumeURL" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "LessonProgress" (
	"id" text PRIMARY KEY NOT NULL,
	"userID" text NOT NULL,
	"lessonID" text NOT NULL,
	"progress" text NOT NULL,
	"resumeURL" text NOT NULL,
	"progressMap" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "public"."Categories"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "public"."Courses"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "AdminUsers" ADD CONSTRAINT "AdminUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_userID_fkey" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "public"."Courses"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_userID_fkey" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_lessonID_fkey" FOREIGN KEY ("lessonID") REFERENCES "public"."Lessons"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken" USING btree ("identifier" text_ops,"token" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken" USING btree ("token" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account" USING btree ("provider" text_ops,"providerAccountId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session" USING btree ("sessionToken" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Categories_slug_key" ON "Categories" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Courses_slug_key" ON "Courses" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Lessons_courseID_slug_key" ON "Lessons" USING btree ("courseID" text_ops,"slug" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "AdminUsers_userId_key" ON "AdminUsers" USING btree ("userId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "User_email_key" ON "User" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "User_username_key" ON "User" USING btree ("username" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "CourseProgress_userID_courseID_key" ON "CourseProgress" USING btree ("userID" text_ops,"courseID" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "LessonProgress_userID_lessonID_key" ON "LessonProgress" USING btree ("userID" text_ops,"lessonID" text_ops);
*/