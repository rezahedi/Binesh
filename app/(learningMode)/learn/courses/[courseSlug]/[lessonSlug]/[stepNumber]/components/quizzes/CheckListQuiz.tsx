import {type CheckListQuiz, QuizType} from "@/lib/quizParser";
import React, {useState} from "react";

const CheckListQuiz = ({quiz}: {quiz: QuizType}) => {
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const quizBlock = quiz.quizBlock as CheckListQuiz;

  return (
    <div>
      {quizBlock.options.map((option, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              name="userAnswer"
              value={index}
              checked={userAnswer.includes(String(index))}
              onChange={(e) => {
                if (e.target.checked) {
                  setUserAnswer([...userAnswer, String(index)]);
                } else {
                  setUserAnswer(
                    userAnswer.filter((val) => val !== String(index))
                  );
                }
              }}
            />
            {option}
          </label>
        </div>
      ))}
      {quizBlock.answer.toString()} = {userAnswer.toString()}
    </div>
  );
};

export default CheckListQuiz;
