import {FillQuizType, QuizType} from "@/lib/quizParser";
import React, {useState} from "react";

const FillInQuiz = ({quiz}: {quiz: QuizType}) => {
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const quizBlock = quiz.quizBlock as FillQuizType;
  const [pre, suf] = quizBlock.content.split("[ ]");

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
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        {quizBlock.inputType}
        {suf}
      </p>
      {quizBlock.answer} = {userAnswer}
    </div>
  );
};

export default FillInQuiz;
