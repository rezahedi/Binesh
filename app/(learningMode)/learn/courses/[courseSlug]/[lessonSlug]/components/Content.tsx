import { useProgress } from "@/contexts/ProgressContext";
import { useState } from "react";
import Finish from "./Finish";
import StartLesson from "./StartLesson";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { updateProgress } from "@/(learningMode)/actions/progress";
import { lessonCompleted } from "@/(learningMode)/actions/trophy";
import { useUser } from "@stackframe/stack";
import { mutate } from "swr";

const Content = () => {
  const { finished } = useProgress();
  const [showFinish, setShowFinish] = useState<boolean>(false);
  const { courseSlug, lessonSlug } = useParams();
  const user = useUser();

  const handleFinish = () => {
    if (!courseSlug || !lessonSlug || !user) return;

    // TODO: updateProgress() Async action called without await, causing fire-and-forget behavior.
    // How to fix: await, loading state, catch error and try again
    mutate(`/api/courses/${courseSlug}`);
    updateProgress(String(courseSlug), String(lessonSlug));
    lessonCompleted(user.id);
    setShowFinish(true);
  };

  if (showFinish) return <Finish />;

  return (
    <div className="flex flex-col h-screen">
      <StartLesson />
      {finished && (
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
