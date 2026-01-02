import ShowStep from "./ShowStep";
import useSteps from "../useSteps";
import { useProgress } from "@/contexts/ProgressContext";
import { useEffect, useRef } from "react";
import Header from "./Header";
import LoadingContent from "./LoadingContent";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LESSON_LOCK_STATUS_CODE } from "@/constants/learningMode";

const StartLesson = () => {
  const { steps, loading, error } = useSteps();
  const { currentStep, totalSteps, startLesson } = useProgress();
  const mainElement = useRef<HTMLDivElement>(null);
  const currentStepElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!steps.length && totalSteps) return;

    startLesson(steps.length);
  }, [steps]);

  // Smooth scroll down to next step
  useEffect(() => {
    if (!mainElement.current || !currentStepElement.current) return;

    const headerHeight: number =
      document.querySelector("header")?.offsetHeight || 0;
    mainElement.current.scrollTo({
      top: currentStepElement.current?.offsetTop - headerHeight,
      behavior: "smooth",
    });
  }, [currentStep]);

  if (loading) return <LoadingContent isActive={loading} />;

  return (
    <div className="flex flex-col h-full">
      <Header />
      <div ref={mainElement} className="flex-1 overflow-y-scroll">
        <div className="h-full max-w-2xl mx-auto px-4">
          <ShowError error={error} />
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

const ShowError = ({ error }: { error: number | null }) => {
  const router = useRouter();

  if (!error) return null;

  const handleRetry = () => {
    // TODO: Should fetch steps again instead of reloading the whole page!
    window.location.reload();
  };

  const handleGoBack = () => {
    router.push("./");
  };

  return (
    <div className="h-full flex flex-col gap-6 justify-center items-center text-center text-xl text-balance">
      {error === LESSON_LOCK_STATUS_CODE ? (
        <>
          <p>This lesson is locked, Complete all previous lessons first.</p>
          <Button variant={"primary"} onClick={handleGoBack}>
            Go Back
          </Button>
        </>
      ) : (
        <>
          <p>Something went wrong, Please try again.</p>
          <Button variant={"primary"} onClick={handleRetry}>
            Retry
          </Button>
        </>
      )}
    </div>
  );
};
