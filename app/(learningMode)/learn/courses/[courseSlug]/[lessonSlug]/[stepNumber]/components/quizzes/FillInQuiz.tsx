import { FillQuizType, QuizType } from "@/lib/quizParser";
import React, { useEffect, useState } from "react";

const FillInQuiz = ({
  quiz,
  isActive,
  onCheck,
}: {
  quiz: QuizType;
  isActive: boolean;
  onCheck: (state: boolean) => void;
}) => {
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const quizBlock = quiz.quizBlock as FillQuizType;
  const [pre, suf] = quizBlock.content.split("[ ]");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) return;

    setUserAnswer(e.target.value);
  };

  const handleCheckAnswer = () => {
    if (userAnswer === null) return;

    if (quizBlock.inputType === "string")
      return setIsCorrect(
        userAnswer.toLowerCase() === quizBlock.answer.toLowerCase()
      );

    setIsCorrect(userAnswer === quizBlock.answer);
  };

  useEffect(() => {
    if (isCorrect !== null) onCheck(isCorrect);
  }, [isCorrect, onCheck]);

  return (
    <div>
      <p>
        {pre}
        <input
          className="border"
          name="userAnswer"
          type={quizBlock.inputType}
          defaultValue={userAnswer || ""}
          onChange={handleChange}
          readOnly={!isActive}
        />
        {suf}
      </p>
      {isActive && !isCorrect && (
        <button onClick={handleCheckAnswer} disabled={userAnswer === null}>
          Check Answer
        </button>
      )}
    </div>
  );
};

export default FillInQuiz;
