import { RadioQuizType } from "@/lib/quizParser";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { IQuizProp } from "@/components/quizzes/QuizRenderer";
import { QuizLayout, QuizActions } from "./components";
import ReactMarkdown from "@/lib/markdown";
import { getAnswerFeedbackClasses } from "./utils";

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
      <QuizLayout content={quiz.content}>
        <div
          className={cn(
            `grid gap-3 mt-4 [&_figure]:p-0 has-[.katex]:text-2xl`,
            quizBlock.options.length < 4
              ? `grid-cols-1 [&_img]:h-36`
              : `grid-cols-2`,
            !isActive && `pointer-events-none`
          )}
        >
          {quizBlock.options.map((option, index) => (
            <label
              htmlFor={`${quiz.id}-${index}`}
              key={index}
              tabIndex={0}
              className={cn(
                `rounded-xl p-4 px-6 cursor-pointer text-center font-medium border-2 border-border`,
                `hover:border-quiz-select hover:bg-quiz-select-light`,
                `has-checked:border-quiz-select-dark has-checked:bg-quiz-select-light has-checked:text-quiz-select-dark transition-all duration-100`,
                getAnswerFeedbackClasses(isCorrect)
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
              <ReactMarkdown>{option}</ReactMarkdown>
            </label>
          ))}
        </div>
      </QuizLayout>
      {isActive && !isCorrect && (
        <QuizActions
          disabled={userAnswer === null}
          onCheck={handleCheckAnswer}
        />
      )}
    </>
  );
};

export default RadioQuiz;
