import { QuizType, RadioQuizType } from "@/lib/quizParser";
import React, { useEffect, useState } from "react";

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
  }, [isCorrect, onCheck]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1">
        <div className="my-4 p-4 px-6 rounded-lg bg-gray-100">
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
          <p>
            {quizBlock.answer} = {userAnswer}
          </p>
        </div>
        {isCorrect !== null && (
          <p>{isCorrect ? "🎉 Correct" : "😩 Incorrect"}</p>
        )}
      </div>
      {isActive && !isCorrect && (
        <div className="flex gap-2 items-center sticky bottom-0 bg-white py-3">
          <button
            onClick={handleCheckAnswer}
            disabled={userAnswer === null}
            className="font-semibold p-3 px-6 mx-auto w-1/2 rounded-full bg-zinc-800 disabled:bg-zinc-100 text-white disabled:text-zinc-400 cursor-pointer disabled:cursor-not-allowed"
          >
            Check
          </button>
        </div>
      )}
    </div>
  );
};

export default RadioQuiz;
