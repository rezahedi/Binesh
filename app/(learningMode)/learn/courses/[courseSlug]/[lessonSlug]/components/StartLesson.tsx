import ShowStep from "./ShowStep";
import useSteps from "../useSteps";
import { useProgress } from "../ProgressContext";
import { useEffect, useRef } from "react";
import Header from "./Header";

const StartLesson = () => {
  const { steps, loading, error } = useSteps();
  const { currentStep, setTotalSteps } = useProgress();
  const mainElement = useRef<HTMLDivElement>(null);
  const currentStepElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTotalSteps(steps.length);
  }, [steps, setTotalSteps]);

  // Smooth scroll down on next step
  useEffect(() => {
    if (!mainElement.current || !currentStepElement.current) return;

    const headerHeight: number =
      document.querySelector("header")?.offsetHeight || 0;
    mainElement.current.scrollTo({
      top: currentStepElement.current?.offsetTop - headerHeight,
      behavior: "smooth",
    });
  }, [currentStep]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div ref={mainElement} className="flex-1 overflow-y-scroll">
        <div className="h-full max-w-2xl mx-auto px-4">
          {loading && (
            <div className="text-orange-500 font-semibold text-xl">
              Loading...
            </div>
          )}
          {error && <div className="font-semibold text-xl">{error}</div>}

          {steps.length > 0 &&
            steps
              .slice(0, currentStep)
              .map((step, index) => (
                <ShowStep
                  key={index}
                  step={step}
                  index={index}
                  ref={
                    currentStep === index + 1 ? currentStepElement : undefined
                  }
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default StartLesson;
