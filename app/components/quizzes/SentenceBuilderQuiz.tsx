import { SentenceBuilderQuizType } from "@/lib/quizParser";
import { IQuizProp } from "./QuizRenderer";
import { QuizActions, QuizLayout } from "./components";
import { Button } from "../ui/button";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { ANIMATE_DELAY_PER_PART } from "@/constants/learningMode";

const SentenceBuilderQuiz = ({
  quiz,
  isActive,
  quizResult: isCorrect,
  onCheck: setIsCorrect,
}: IQuizProp) => {
  const { answer: answerParts, options: optionParts } =
    quiz.quizBlock as SentenceBuilderQuizType;
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const isSentenceCompleted = selectedIndexes.length === answerParts.length;

  const handleCheckAnswer = () => {
    if (!isSentenceCompleted) return;

    const userParts = selectedIndexes.map((index) => optionParts[index] || "");
    setIsCorrect(userParts.every((part, i) => answerParts[i] === part));
  };

  const handleOptionClick = (index: number) => {
    if (!isActive || selectedIndexes.includes(index)) return;

    setIsCorrect(null);
    setSelectedIndexes((prev) => [...prev, index]);
  };

  const handlePartClick = (index: number) => {
    if (!isActive) return;
    setIsCorrect(null);
    setSelectedIndexes((prev) => prev.filter((i) => i !== index));
  };

  const handleResetAnswer = () => {
    setIsCorrect(null);
    setSelectedIndexes([]);
  };

  return (
    <>
      <QuizLayout content={quiz.content}>
        <div className="grid auto-rows-fr gap-6">
          <div
            className={cn(
              "relative h-full",
              !isActive && `pointer-events-none`
            )}
          >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden **:border-b **:h-[53px] **:mb-[9px] sm:**:h-14 sm:**:mb-3.5 pointer-events-none">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="flex gap-x-2 gap-y-4 sm:gap-y-6 flex-wrap">
              {selectedIndexes.map((optionIndex, i) => (
                <Button
                  key={`${optionIndex}-${i}`}
                  variant={"outline"}
                  tabIndex={0}
                  className={cn(
                    "border rounded-xl max-sm:px-4",
                    isCorrect !== null
                      ? isCorrect === true
                        ? `border-quiz-success-dark shadow-quiz-success-dark bg-quiz-success-light text-quiz-success-dark animate-bounce-once`
                        : `border-quiz-error-dark shadow-quiz-error-dark bg-quiz-error-light text-quiz-error-dark`
                      : ``
                  )}
                  {...(isCorrect && {
                    style: {
                      animationDelay: `${ANIMATE_DELAY_PER_PART * i}ms`,
                    },
                  })}
                  onClick={() => handlePartClick(optionIndex)}
                >
                  {optionParts[optionIndex]}{" "}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex gap-x-2 gap-y-4 sm:gap-y-6 flex-wrap justify-center sm:gap-x-4">
            {optionParts.map((optionValue, optionIndex) => {
              const isPicked = selectedIndexes.includes(optionIndex);
              return (
                <Button
                  key={optionIndex}
                  variant={"outline"}
                  tabIndex={0}
                  className={cn(
                    "border rounded-xl mb-2 max-sm:px-4",
                    isPicked && "border-muted/50 shadow-muted/50 bg-muted/50"
                  )}
                  disabled={isPicked}
                  onClick={() => handleOptionClick(optionIndex)}
                >
                  {isPicked ? (
                    <span className="invisible">{optionValue}</span>
                  ) : (
                    optionValue
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </QuizLayout>
      {isActive && !isCorrect && (
        <QuizActions
          disabled={!isSentenceCompleted}
          onCheck={handleCheckAnswer}
          onReset={isSentenceCompleted ? handleResetAnswer : undefined}
        />
      )}
    </>
  );
};

export default SentenceBuilderQuiz;
