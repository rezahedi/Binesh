import { SectionType } from "@/lib/quizParser";
import QuizRenderer from "@/components/quizzes/QuizRenderer";
import { useProgress } from "@/contexts/ProgressContext";
import { useState } from "react";
import ReactMarkdown from "@/lib/markdown";
import { FlagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@stackframe/stack";

interface ShowStepProps extends React.ComponentProps<"div"> {
  step: SectionType;
  index: number;
}

export default function ShowStep({ step, index, ...restProps }: ShowStepProps) {
  const { cells, nextStep, currentStep, isFinished, quizAnswered } =
    useProgress();
  const [quizResult, setQuizResult] = useState<boolean | null>(null);
  const user = useUser();

  // TODO: Temporary solution, find a better way than passing step's `index` to check if this is the curr step
  const haveQuiz = Boolean(step.quiz);
  const isCurrent = index + 1 === currentStep;
  const isQuizFinished = quizResult;
  const haveCells = cells !== null && cells > 0;

  const isNextReady = isCurrent && (!haveQuiz || (haveQuiz && isQuizFinished));

  const handleNextStep = async () => {
    if (!user) return;

    nextStep();
  };

  const handleResultCheck = (isCorrect: boolean | null) => {
    setQuizResult(isCorrect);

    if (!user || isCorrect === null) return;

    quizAnswered(isCorrect);
  };

  return (
    <div
      className={`pt-8 flex flex-col ${isCurrent ? "h-full" : "pb-12"}`}
      {...restProps}
    >
      {step.content && (
        <div className="flex-1">
          <ReactMarkdown>{step.content}</ReactMarkdown>
        </div>
      )}
      {step.quiz && (
        <QuizRenderer
          quiz={{ ...step.quiz, id: step.id }}
          isActive={isCurrent && !isQuizFinished && haveCells}
          quizResult={quizResult}
          onCheck={handleResultCheck}
        />
      )}
      {isNextReady && !isFinished && (
        <div className="flex gap-2 items-center sticky bottom-0 bg-background py-3">
          <div className="flex-1 flex gap-3 items-center">
            <Button
              variant={"ghost"}
              className="text-muted-foreground"
              size={"sm"}
            >
              <FlagIcon className="size-4" /> Report
            </Button>
            {quizResult !== null && (
              <p className="font-semibold text-xl text-primary">
                {quizResult ? "🎉 Correct" : "😩 Incorrect"}
              </p>
            )}
          </div>
          <Button
            onClick={handleNextStep}
            variant={"primary"}
            className="font-semibold"
            disabled={!haveCells}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}
