import { CheckListQuizType } from "@/lib/quizParser";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { IQuizProp } from "@/components/quizzes/QuizRenderer";
import { QuizLayout, QuizActions } from "./components";
import ReactMarkdown from "@/lib/markdown";
import { getAnswerFeedbackClasses } from "./utils";

const CheckListQuiz = ({
  quiz,
  isActive,
  quizResult: isCorrect,
  onCheck: setIsCorrect,
}: IQuizProp) => {
  const [userAnswer, setUserAnswer] = useState<number[]>([]);
  const quizBlock = quiz.quizBlock as CheckListQuizType;

  // TODO: Let the user know if the answer is partially correct

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) return;

    const index = Number(e.target.value);
    if (isCorrect === false) {
      setIsCorrect(null);
      return setUserAnswer([index]);
    }

    if (e.target.checked) setUserAnswer([...userAnswer, index]);
    else setUserAnswer(userAnswer.filter((val) => val !== index));
  };

  const handleCheckAnswer = () => {
    if (userAnswer.length === 0) return;

    if (userAnswer.length !== quizBlock.answer.length)
      return setIsCorrect(false);

    setIsCorrect(userAnswer.every((a) => quizBlock.answer.includes(a)));
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
                type="checkbox"
                name={quiz.id}
                value={index}
                checked={userAnswer.includes(index)}
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
          disabled={userAnswer.length === 0}
          onCheck={handleCheckAnswer}
        />
      )}
    </>
  );
};

export default CheckListQuiz;
