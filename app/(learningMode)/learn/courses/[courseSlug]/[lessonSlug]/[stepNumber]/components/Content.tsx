import ShowStep from "./ShowStep";
import useSteps from "../useSteps";
import { useProgress } from "../ProgressContext";
import { useEffect } from "react";
import { cn } from "@/utils/cn";

const Content = ({ className }: { className?: string }) => {
  const { steps, loading, error } = useSteps();
  const { currentStep, setStepCount } = useProgress();

  useEffect(() => {
    setStepCount(steps.length);
  }, [steps, setStepCount]);

  return (
    <main className={cn("overflow-y-auto", className)}>
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
              <ShowStep key={index} step={step} index={index} />
            ))}
      </div>
    </main>
  );
};

export default Content;
