import { SentenceBuilderQuizType } from "@/lib/quizParser";
import { IQuizProp } from "./QuizRenderer";
import { QuizActions, QuizLayout } from "./components";
import { Button } from "../ui/button";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { ANIMATE_DELAY_PER_PART } from "@/constants/learningMode";

type Option = { index: number; value: string };

const SentenceBuilderQuiz = ({
  quiz,
  isActive,
  quizResult: isCorrect,
  onCheck: setIsCorrect,
}: IQuizProp) => {
  const quizBlock = quiz.quizBlock as SentenceBuilderQuizType;
  const [userAnswer, setUserAnswer] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>(shuffle(quizBlock.options));

  const isSentenceCompleted = userAnswer.length === quizBlock.options.length;

  const handleCheckAnswer = () => {
    if (!isSentenceCompleted) return;

    // quizBlock.options have the correct order.
    setIsCorrect(userAnswer.every((v, i) => quizBlock.options[i] === v.value));
  };

  const handleOptionClick = (index: number) => {
    if (!isActive) return;

    setIsCorrect(null);

    const word = options.find((v) => v.index === index);
    if (!word) return;

    setOptions((prev) =>
      prev.map((p) => ({
        index: p.index,
        value: p.index === index ? "" : p.value,
      }))
    );
    setUserAnswer((prev) => [...prev, word]);
  };

  const handlePartClick = (index: number) => {
    if (!isActive) return;

    setIsCorrect(null);

    const word = userAnswer.find((v) => v.index === index);
    if (!word) return;

    setUserAnswer((prev) => prev.filter((v) => v.index != index));
    setOptions((prev) => prev.map((p) => (p.index === index ? word : p)));
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
              {userAnswer.map((part, i) => (
                <Button
                  key={part.index}
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
                  onClick={() => handlePartClick(part.index)}
                >
                  {part.value}{" "}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex gap-x-2 gap-y-4 sm:gap-y-6 flex-wrap justify-center sm:gap-x-4">
            {options.map((option) => (
              <Button
                key={option.index}
                variant={"outline"}
                tabIndex={0}
                className={cn(
                  "border rounded-xl mb-2 max-sm:px-4",
                  option.value === "" &&
                    "border-muted/50 shadow-muted/50 bg-muted/50"
                )}
                disabled={option.value === ""}
                onClick={() => handleOptionClick(option.index)}
              >
                {option.value === "" ? (
                  <span className="invisible">
                    {userAnswer.find((v) => v.index === option.index)?.value}
                  </span>
                ) : (
                  option.value
                )}
              </Button>
            ))}
          </div>
        </div>
      </QuizLayout>
      {isActive && !isCorrect && (
        <QuizActions
          disabled={!isSentenceCompleted}
          onCheck={handleCheckAnswer}
        />
      )}
    </>
  );
};

export default SentenceBuilderQuiz;

export const shuffle = (array: string[]): Option[] => {
  if (array.length <= 1) return array.map((v, i) => ({ index: i, value: v }));

  let shuffled: Option[];
  let similarity = 1;

  do {
    shuffled = array.map((v, i) => ({ index: i, value: v }));

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    similarity = shuffled.filter((v, i) => v.index === i).length / array.length;
  } while (similarity > 0.3);

  return shuffled;
};
