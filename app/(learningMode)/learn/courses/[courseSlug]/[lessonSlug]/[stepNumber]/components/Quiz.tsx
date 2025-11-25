import {QuizType} from "@/lib/quizParser";
import {useState} from "react";

const Quiz = ({quiz}: {quiz: QuizType}) => {
  const [userAnswer, setUserAnswer] = useState<string | null>(null);

  return (
    <div>
      {JSON.stringify(quiz)}
      <input
        className="border"
        name="userAnswer"
        type="text"
        defaultValue={userAnswer || ""}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
    </div>
  );
};

export default Quiz;
