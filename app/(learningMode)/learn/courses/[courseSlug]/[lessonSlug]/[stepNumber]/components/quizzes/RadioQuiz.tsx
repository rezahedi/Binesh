import {QuizType, RadioQuizType} from "@/lib/quizParser";
import React, {useEffect, useState} from "react";

const RadioQuiz = ({
  quiz,
  isActive,
  onCheck,
}: {
  quiz: QuizType;
  isActive: boolean;
  onCheck: (state: boolean) => void;
}) => {
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const quizBlock = quiz.quizBlock as RadioQuizType;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) return;

    setUserAnswer(Number(e.target.value));
  };

  const handleCheckAnswer = () => {
    if (userAnswer === null) return;

    setIsCorrect(userAnswer === quizBlock.answer);
  };

  useEffect(() => {
    if (isCorrect !== null) onCheck(isCorrect);
  }, [isCorrect]);

  return (
    <div>
      Radio Quiz
      {quizBlock.options.map((option, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              name="userAnswer"
              value={index}
              checked={userAnswer === index}
              onChange={handleChange}
              readOnly={!isActive}
            />
            {option}
          </label>
        </div>
      ))}
      {isActive && !isCorrect && (
        <button onClick={handleCheckAnswer} disabled={userAnswer === null}>
          Check Answer
        </button>
      )}
      <p>
        {quizBlock.answer} = {userAnswer}
      </p>
    </div>
  );
};

export default RadioQuiz;
