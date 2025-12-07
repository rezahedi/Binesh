import { RadioQuizType } from "@/lib/quizParser";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import ReactMarkdown from "@/lib/markdown";
import { IQuizProp } from "./QuizRenderer";
import { FlagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const RadioQuiz = ({
  quiz,
  isActive,
  quizResult: isCorrect,
  onCheck: setIsCorrect,
}: IQuizProp) => {
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const quizBlock = quiz.quizBlock as RadioQuizType;
  // TODO: Keep track of options selected by user as answer but it's wrong and disable them.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) return;

    setIsCorrect(null);
    setUserAnswer(Number(e.target.value));
  };

  const handleCheckAnswer = () => {
    if (userAnswer === null) return;

    setIsCorrect(userAnswer === quizBlock.answer);
  };

  return (
    <>
      <div className="flex-10">
        <div className="my-4 p-6 px-8 rounded-xl bg-card">
          <ReactMarkdown>{quiz.content}</ReactMarkdown>
          <div
            className={cn(
              `grid gap-3 mt-4`,
              quizBlock.options.length < 4 ? `grid-cols-1` : `grid-cols-2`
            )}
          >
            {quizBlock.options.map((option, index) => (
              <label
                htmlFor={`${quiz.id}-${index}`}
                key={index}
                tabIndex={0}
                className={cn(
                  `rounded-xl p-4 px-6 cursor-pointer text-center font-medium border-2 border-border`,
                  `hover:border-quiz-select-300 hover:bg-quiz-select-50`,
                  `has-checked:border-quiz-select-700 has-checked:bg-quiz-select-50 has-checked:text-quiz-select-700`,
                  isCorrect !== null
                    ? isCorrect === true
                      ? `has-checked:border-quiz-success-300 has-checked:bg-quiz-success-50 has-checked:text-quiz-success-700 relative after:hidden has-checked:after:block after:content-['✔'] after:absolute after:-top-2 after:-right-2 after:px-2 after:py-0.5 after:rounded-lg after:bg-quiz-success-300`
                      : `has-checked:border-quiz-error-300 has-checked:bg-quiz-error-50 has-checked:text-quiz-error-700 relative after:hidden has-checked:after:block after:content-['✘'] after:absolute after:-top-2 after:-right-2 after:px-2 after:py-0.5 after:rounded-lg after:bg-quiz-error-300`
                    : ``,
                  !isActive && `pointer-events-none`
                )}
              >
                <input
                  id={`${quiz.id}-${index}`}
                  type="radio"
                  name={quiz.id}
                  value={index}
                  checked={userAnswer === index}
                  onChange={handleChange}
                  readOnly={!isActive}
                  className="hidden"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      </div>
      {isActive && !isCorrect && (
        <div className="flex gap-2 items-center sticky bottom-0 bg-background py-3">
          <div className="flex-1">
            <Button
              variant={"ghost"}
              className="text-muted-foreground"
              size={"sm"}
            >
              <FlagIcon className="size-4" /> Report
            </Button>
          </div>
          <Button
            onClick={handleCheckAnswer}
            disabled={userAnswer === null}
            className="font-semibold"
          >
            Check It
          </Button>
        </div>
      )}
    </>
  );
};

export default RadioQuiz;
