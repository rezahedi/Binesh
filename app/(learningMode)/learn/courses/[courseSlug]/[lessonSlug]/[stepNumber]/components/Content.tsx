import ShowStep from "./ShowStep";
import useSteps from "../useSteps";
import { useProgress } from "../ProgressContext";
import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

const Content = ({ className }: { className?: string }) => {
  const { steps, loading, error } = useSteps();
  const { currentStep, setStepCount } = useProgress();
  const mainElement = useRef<HTMLDivElement>(null);
  const currentStepElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStepCount(steps.length);
  }, [steps, setStepCount]);

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
    <div ref={mainElement} className={cn("overflow-y-auto", className)}>
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
                ref={currentStep === index + 1 ? currentStepElement : undefined}
              />
            ))}
      </div>
    </div>
  );
};

export default Content;
