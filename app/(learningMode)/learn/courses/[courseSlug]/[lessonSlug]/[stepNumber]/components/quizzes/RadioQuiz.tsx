import {QuizType, type RadioQuiz} from "@/lib/quizParser";
import React, {useState} from "react";

const RadioQuiz = ({quiz}: {quiz: QuizType}) => {
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const quizBlock = quiz.quizBlock as RadioQuiz;

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
              checked={userAnswer === String(index)}
              onChange={(e) => setUserAnswer(String(index))}
            />
            {option}
          </label>
        </div>
      ))}
      {quizBlock.answer} = {userAnswer}
    </div>
  );
};

export default RadioQuiz;
