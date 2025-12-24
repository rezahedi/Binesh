import ProgressBar from "@/(learningMode)/learn/courses/[courseSlug]/[lessonSlug]/components/ProgressBar";

const CourseProgressBar = ({
  total,
  completed,
  time,
}: {
  total: number;
  completed: number;
  time: number;
}) => {
  // TODO: It's better to store count of completed lesson in course_progress table rather than calc it from the course compilation percentage.
  const completedLessons = Math.round((total * completed) / 100);

  if (completed === 0) return null;

  return (
    <div className="mt-6">
      <div className="flex justify-between text-sm text-muted-foreground">
        <div>
          {completed === 100 ? (
            <>Course completed 🎉</>
          ) : (
            <>
              {completedLessons}/{total} lessons
            </>
          )}
        </div>
        <div>In {time} mins</div>
      </div>
      <ProgressBar progress={completed} />
    </div>
  );
};

export default CourseProgressBar;
