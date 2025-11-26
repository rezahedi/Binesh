import {CheckListQuizType, QuizType} from "@/lib/quizParser";
import React, {useState} from "react";

const CheckListQuiz = ({
  quiz,
  isActive,
}: {
  quiz: QuizType;
  isActive: boolean;
}) => {
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const quizBlock = quiz.quizBlock as CheckListQuizType;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) return;

    const index = e.target.value;
    if (e.target.checked) setUserAnswer([...userAnswer, index]);
    else setUserAnswer(userAnswer.filter((val) => val !== index));
  };

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
              onChange={handleChange}
              readOnly={!isActive}
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
