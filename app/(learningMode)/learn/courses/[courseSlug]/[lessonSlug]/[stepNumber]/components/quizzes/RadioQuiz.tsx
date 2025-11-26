import {QuizType, RadioQuizType} from "@/lib/quizParser";
import React, {useState} from "react";

const RadioQuiz = ({quiz, isActive}: {quiz: QuizType; isActive: boolean}) => {
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const quizBlock = quiz.quizBlock as RadioQuizType;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) return;

    const index = e.target.value;
    setUserAnswer(index);
  };

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
              onChange={handleChange}
              readOnly={!isActive}
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
