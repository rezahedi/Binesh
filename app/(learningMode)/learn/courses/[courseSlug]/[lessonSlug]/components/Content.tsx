import { useProgress } from "../ProgressContext";
import { useState } from "react";
import Finish from "./Finish";
import StartLesson from "./StartLesson";

const Content = () => {
  const { finished } = useProgress();
  const [showFinish, setSHowFinish] = useState<boolean>(false);

  const handleFinish = () => {
    setSHowFinish(true);
  };

  if (showFinish) return <Finish />;

  return (
    <div className="flex flex-col h-screen">
      <StartLesson />
      {finished && (
        <div className="sticky bottom-0 bg-background py-3">
          <div className="max-w-2xl mx-auto px-4 flex items-center">
            <button
              onClick={handleFinish}
              className="font-semibold p-3 px-6 mx-auto w-1/2 rounded-full bg-primary text-primary-foreground cursor-pointer"
            >
              Finish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
