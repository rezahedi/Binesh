import { CheckListQuizType, QuizType } from "@/lib/quizParser";
import React, { useEffect, useState } from "react";

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
  }, [isCorrect, onCheck]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1">
        <div className="my-4 p-4 px-6 rounded-lg bg-gray-100">
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
          <p>
            {quizBlock.answer.toString()} = {userAnswer.toString()}
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
            disabled={userAnswer.length === 0}
            className="font-semibold p-3 px-6 mx-auto w-1/2 rounded-full bg-zinc-800 disabled:bg-zinc-100 text-white disabled:text-zinc-400 cursor-pointer disabled:cursor-not-allowed"
          >
            Check
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckListQuiz;
