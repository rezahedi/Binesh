import { FillQuizType } from "@/lib/quizParser";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { IQuizProp } from "@/components/quizzes/QuizRenderer";
import { QuizLayout, QuizActions } from "./components";

const FillInQuiz = ({
  quiz,
  isActive,
  quizResult: isCorrect,
  onCheck: setIsCorrect,
}: IQuizProp) => {
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const quizBlock = quiz.quizBlock as FillQuizType;
  const [pre, suf] = quizBlock.content.split("[ ]");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) return;

    setIsCorrect(null);
    setUserAnswer(e.target.value);
  };

  const handleCheckAnswer = () => {
    if (userAnswer === null) return;

    let result: boolean;

    if (quizBlock.inputType === "string")
      result = userAnswer.toLowerCase() === quizBlock.answer.toLowerCase();
    else result = userAnswer === quizBlock.answer;

    setIsCorrect(result);
  };

  return (
    <>
      <QuizLayout content={quiz.content}>
        {pre}
        <input
          className={cn(
            `rounded-xl p-2 px-3 text-center font-medium border-2 border-border hover:border-quiz-select-300 hover:bg-quiz-select-50 field-sizing-content max-w-2xs`,
            quizBlock.inputType == "number" &&
              `[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`,
            isCorrect !== null
              ? isCorrect === true
                ? `border-quiz-success-300 bg-quiz-success-50 text-quiz-success-700`
                : `border-quiz-error-300 bg-quiz-error-50 text-quiz-error-700`
              : ``,
            !isActive && `pointer-events-none`
          )}
          id={quiz.id}
          name={quiz.id}
          type={quizBlock.inputType}
          size={quizBlock.answer.length}
          style={{
            minWidth: `${quizBlock.answer.length + (quizBlock.inputType == "number" ? 3 : 0)}em`,
          }}
          defaultValue={userAnswer || ""}
          onChange={handleChange}
          readOnly={!isActive}
        />
        {suf}
        {isCorrect !== null && (
          <p>{isCorrect ? "🎉 Correct" : "😩 Incorrect"}</p>
        )}
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

export default FillInQuiz;
