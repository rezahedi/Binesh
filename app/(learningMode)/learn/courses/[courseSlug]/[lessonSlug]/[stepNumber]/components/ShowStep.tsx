import { SectionType } from "@/lib/quizParser";
import QuizRenderer from "./quizzes/QuizRenderer";
import Markdown from "react-markdown";
import Img from "./markdown/Img";
import { useProgress } from "../ProgressContext";
import { useState } from "react";

export default function ShowStep({
  step,
  index,
}: {
  step: SectionType;
  index: number;
}) {
  const { nextStep, currentStep } = useProgress();
  const [quizResult, setQuizResult] = useState<boolean | null>(null);

  // TODO: Temporary solution, find a better way than passing step's `index` to check if this is the curr step
  const haveQuiz = Boolean(step.quiz);
  const isCurrent = index + 1 === currentStep;
  const isQuizFinished = quizResult;

  const isNextReady = isCurrent && (!haveQuiz || (haveQuiz && isQuizFinished));

  return (
    <div className={`pt-8 flex flex-col ${isCurrent ? "h-full" : "pb-12"}`}>
      <div className="flex-1 flex flex-col">
        <Markdown components={{ img: Img }}>{step.content}</Markdown>
        {step.quiz && (
          <QuizRenderer
            quiz={step.quiz}
            isActive={isCurrent && !isQuizFinished}
            onCheck={setQuizResult}
          />
        )}
      </div>
      {isNextReady && (
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
