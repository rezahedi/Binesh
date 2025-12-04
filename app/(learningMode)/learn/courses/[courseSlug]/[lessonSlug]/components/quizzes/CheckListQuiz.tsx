import { CheckListQuizType } from "@/lib/quizParser";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import ReactMarkdown from "@/lib/markdown";
import { IQuizProp } from "./QuizRenderer";

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
      <div className="flex-10">
        <div className="my-4 p-6 px-8 rounded-xl bg-gray-50">
          <ReactMarkdown>{quiz.content}</ReactMarkdown>
          <div
            className={cn(
              `grid gap-3 mt-4`,
              quizBlock.options.length < 4 ? `grid-cols-1` : `grid-cols-2`
            )}
          >
            {quizBlock.options.map((option, index) => (
              <label
                htmlFor={`randomString-${index}`}
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
                  id={`randomString-${index}`}
                  type="checkbox"
                  name="userAnswer"
                  value={index}
                  checked={userAnswer.includes(index)}
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
            disabled={userAnswer.length === 0}
            className="font-semibold p-3 px-6 mx-auto w-1/2 rounded-full bg-zinc-800 disabled:bg-zinc-100 text-white disabled:text-zinc-400 cursor-pointer disabled:cursor-not-allowed"
          >
            Check
          </button>
        </div>
      )}
    </>
  );
};

export default CheckListQuiz;
