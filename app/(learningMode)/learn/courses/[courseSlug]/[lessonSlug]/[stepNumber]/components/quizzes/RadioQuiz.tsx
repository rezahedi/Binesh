import { QuizType, RadioQuizType } from "@/lib/quizParser";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import markdownComponents from "../markdown";
import { cn } from "@/utils/cn";

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

  useEffect(() => {
    if (isCorrect !== null) onCheck(isCorrect);
  }, [isCorrect, onCheck]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1">
        <div className="my-4 p-6 px-8 rounded-xl bg-gray-50">
          <Markdown components={markdownComponents}>{quiz.content}</Markdown>
          <div
            className={cn(
              `grid gap-3 mt-4`,
              quizBlock.options.length < 4 ? `grid-cols-1` : `grid-cols-2`
            )}
          >
            {quizBlock.options.map((option, index) => (
              <label
                htmlFor={`randomStr-${index}`}
                key={index}
                tabIndex={0}
                className={cn(
                  `rounded-xl p-4 px-6 cursor-pointer text-center font-medium border-2 border-zinc-300`,
                  `hover:border-blue-300 hover:bg-blue-50`,
                  `has-checked:border-blue-700 has-checked:bg-blue-50 has-checked:text-blue-700`,
                  isCorrect !== null
                    ? isCorrect === true
                      ? `has-checked:border-green-300 has-checked:bg-green-50 has-checked:text-green-700 relative after:hidden has-checked:after:block after:content-['✔'] after:absolute after:-top-2 after:-right-2 after:px-2 after:py-0.5 after:rounded-lg after:bg-green-300`
                      : `has-checked:border-red-300 has-checked:bg-red-50 has-checked:text-red-700 relative after:hidden has-checked:after:block after:content-['✘'] after:absolute after:-top-2 after:-right-2 after:px-2 after:py-0.5 after:rounded-lg after:bg-red-300`
                    : ``,
                  !isActive && `pointer-events-none`
                )}
              >
                <input
                  id={`randomStr-${index}`}
                  type="radio"
                  name="userAnswer"
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
