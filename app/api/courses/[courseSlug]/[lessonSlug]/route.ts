import { NextRequest, NextResponse } from "next/server";
import { parseLesson } from "@/lib/quizParser";
import { stackServerApp } from "@stack/server";
import { getCourseBySlug, getLessonBySlug } from "@/(learningMode)/utils/db";
import { LessonProps } from "@/lib/types";
// import { LESSON_LOCK_STATUS_CODE } from "@/constants/learningMode";

export const GET = async (
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ courseSlug: string; lessonSlug: string }>;
  }
) => {
  const { courseSlug, lessonSlug } = await params;

  const user = await stackServerApp.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // TODO: Check user's progress and find out if the lesson is locked or not
  /*  return NextResponse.json(
    {
      msg: "locked",
    },
    { status: LESSON_LOCK_STATUS_CODE }
  );*/

  let courseId: string;
  let lesson: LessonProps;
  try {
    const result = await getCourseBySlug(courseSlug);
    courseId = result.id;
    lesson = await getLessonBySlug(courseId, lessonSlug);
  } catch {
    return NextResponse.json(
      { message: `Course or lesson not found` },
      { status: 404 }
    );
  }

  // Parse markdown content
  const { steps } = parseLesson(lesson.content);

  return NextResponse.json({
    ...lesson,
    content: undefined,
    steps,
  });
};
