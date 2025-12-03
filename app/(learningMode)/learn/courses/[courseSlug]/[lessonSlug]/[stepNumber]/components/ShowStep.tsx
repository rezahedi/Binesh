import { SectionType } from "@/lib/quizParser";
import QuizRenderer from "./quizzes/QuizRenderer";
import { useProgress } from "../ProgressContext";
import { useState } from "react";
import ReactMarkdown from "@/lib/markdown";

interface ShowStepProps extends React.ComponentProps<"div"> {
  step: SectionType;
  index: number;
}

export default function ShowStep({ step, index, ...restProps }: ShowStepProps) {
  const { nextStep, currentStep, stepCount } = useProgress();
  const [quizResult, setQuizResult] = useState<boolean | null>(null);

  // TODO: Temporary solution, find a better way than passing step's `index` to check if this is the curr step
  const haveQuiz = Boolean(step.quiz);
  const isCurrent = index + 1 === currentStep;
  const isQuizFinished = quizResult;

  const isNextReady = isCurrent && (!haveQuiz || (haveQuiz && isQuizFinished));
  const isLastStep = currentStep === stepCount;

  return (
    <div
      className={`pt-8 flex flex-col ${isCurrent ? "h-full" : "pb-12"}`}
      {...restProps}
    >
      <div className="flex-1">
        <ReactMarkdown>{step.content}</ReactMarkdown>
      </div>
      {step.quiz && (
        <QuizRenderer
          quiz={step.quiz}
          isActive={isCurrent && !isQuizFinished}
          onCheck={setQuizResult}
        />
      )}
      {!isLastStep && isNextReady && (
        <div className="flex gap-2 items-center sticky bottom-0 bg-white py-3">
          <div className="flex-1">
            {quizResult !== null && (
              <p className="font-semibold text-xl text-[#29cc57]">
                {quizResult ? "🎉 Correct" : "😩 Incorrect"}
              </p>
            )}
          </div>
          <button
            className="font-semibold p-3 px-6 rounded-full bg-[#29cc57] text-white cursor-pointer"
            onClick={nextStep}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
