import { useProgress } from "../ProgressContext";
import { useState } from "react";
import Finish from "./Finish";
import StartLesson from "./StartLesson";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { updateProgress } from "@/(learningMode)/actions/updateProgress";

const Content = () => {
  const { finished } = useProgress();
  const [showFinish, setSHowFinish] = useState<boolean>(false);
  const { courseSlug, lessonSlug } = useParams();

  const handleFinish = () => {
    if (!courseSlug || !lessonSlug) return;

    updateProgress(String(courseSlug), String(lessonSlug));
    setSHowFinish(true);
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
