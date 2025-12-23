import { useProgress } from "@/contexts/ProgressContext";
import Finish from "./Finish";
import StartLesson from "./StartLesson";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { updateProgress } from "@/(learningMode)/actions/progress";
import { useUser } from "@stackframe/stack";
import { mutate } from "swr";

const Content = () => {
  const { stats, isFinished, lessonFinished } = useProgress();
  const { courseSlug, lessonSlug } = useParams();
  const user = useUser();

  const handleFinish = () => {
    if (!courseSlug || !lessonSlug || !user) return;

    // TODO: updateProgress() Async action called without await, causing fire-and-forget behavior.
    // How to fix: await, loading state, catch error and try again
    updateProgress(String(courseSlug), String(lessonSlug));
    mutate(`/api/courses/${courseSlug}`);
    lessonFinished();
  };

  if (stats.endTime) return <Finish />;

  return (
    <div className="flex flex-col h-dvh">
      <StartLesson />
      {isFinished && (
        <div className="sticky bottom-0 bg-background py-3">
          <div className="max-w-2xl mx-auto px-4 flex items-center">
            <Button
              onClick={handleFinish}
              variant={"primary"}
              className="font-semibold mx-auto w-1/2"
            >
              Finish
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
