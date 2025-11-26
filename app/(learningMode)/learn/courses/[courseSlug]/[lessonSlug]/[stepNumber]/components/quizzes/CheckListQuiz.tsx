import {CheckListQuizType, QuizType} from "@/lib/quizParser";
import React, {useEffect, useState} from "react";

const CheckListQuiz = ({
  quiz,
  isActive,
  onCheck,
}: {
  quiz: QuizType;
  isActive: boolean;
  onCheck: (state: boolean) => void;
}) => {
  const [userAnswer, setUserAnswer] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const quizBlock = quiz.quizBlock as CheckListQuizType;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) return;

    const index = Number(e.target.value);
    if (e.target.checked) setUserAnswer([...userAnswer, index]);
    else setUserAnswer(userAnswer.filter((val) => val !== index));
  };

  const handleCheckAnswer = () => {
    if (userAnswer.length === 0) return;

    if (userAnswer.length !== quizBlock.answer.length)
      return setIsCorrect(false);

    setIsCorrect(userAnswer.every((a) => quizBlock.answer.includes(a)));
  };

  useEffect(() => {
    if (isCorrect !== null) onCheck(isCorrect);
  }, [isCorrect]);

  return (
    <div>
      {quizBlock.options.map((option, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              name="userAnswer"
              value={index}
              checked={userAnswer.includes(index)}
              onChange={handleChange}
              readOnly={!isActive}
            />
            {option}
          </label>
        </div>
      ))}
      {isActive && !isCorrect && (
        <button onClick={handleCheckAnswer} disabled={userAnswer.length === 0}>
          Check Answer
        </button>
      )}
      <p>
        {quizBlock.answer.toString()} = {userAnswer.toString()}
      </p>
    </div>
  );
};

export default CheckListQuiz;
