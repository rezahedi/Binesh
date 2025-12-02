import { FillQuizType, QuizType } from "@/lib/quizParser";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import markdownComponents from "../markdown";

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

    setIsCorrect(null);
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
    <div className="flex-1 flex flex-col">
      <div className="flex-1">
        <div className="my-4 p-6 px-8 rounded-xl bg-gray-50">
          <Markdown components={markdownComponents}>{quiz.content}</Markdown>
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

export default FillInQuiz;
