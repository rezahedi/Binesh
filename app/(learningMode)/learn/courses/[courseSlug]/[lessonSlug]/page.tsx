export default async function page({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = await params;

  return (
    <div>
      <h1>
        Course: {courseSlug} / Lesson: {lessonSlug}
      </h1>
    </div>
  );
}
