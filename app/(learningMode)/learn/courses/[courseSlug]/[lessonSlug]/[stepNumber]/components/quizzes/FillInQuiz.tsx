import {FillQuizType, QuizType} from "@/lib/quizParser";
import React, {useState} from "react";

const FillInQuiz = ({quiz, isActive}: {quiz: QuizType; isActive: boolean}) => {
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const quizBlock = quiz.quizBlock as FillQuizType;
  const [pre, suf] = quizBlock.content.split("[ ]");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) return;

    setUserAnswer(e.target.value);
  };

  return (
    <div>
      Fill-in Quiz
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
        {quizBlock.inputType}
        {suf}
      </p>
      {quizBlock.answer} = {userAnswer}
    </div>
  );
};

export default FillInQuiz;
