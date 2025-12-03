import { useProgress } from "../ProgressContext";
import { useState } from "react";
import Finish from "./Finish";
import StartLesson from "./StartLesson";

const Content = () => {
  const { currentStep, totalSteps } = useProgress();
  const isLastStep = currentStep === totalSteps;
  const [showFinish, setSHowFinish] = useState<boolean>(false);

  const handleFinish = () => {
    setSHowFinish(true);
  };

  if (showFinish) return <Finish />;

  return (
    <div className="flex flex-col h-screen">
      <StartLesson />
      {isLastStep && (
        <div className="flex gap-2 items-center sticky bottom-0 bg-white py-3">
          <button
            onClick={handleFinish}
            className="font-semibold p-3 px-6 mx-auto w-1/2 rounded-full bg-[#29cc57] text-white cursor-pointer"
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
};

export default Content;
