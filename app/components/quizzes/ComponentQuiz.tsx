import { ComponentQuizType } from "@/lib/quizParser";
import { useState } from "react";
import ReactMarkdown from "@/lib/markdown";
import { IQuizProp } from "@/components/quizzes/QuizRenderer";
import { ComponentRenderer } from "@/components/Interactive/ComponentRenderer";
import { QuizLayout, QuizActions } from "./components";

const ComponentQuiz = ({
  quiz,
  isActive,
  quizResult: isCorrect,
  onCheck: setIsCorrect,
}: IQuizProp) => {
  const [userAnswer, setUserAnswer] = useState<unknown | null>(null);
  const quizBlock = quiz.quizBlock as ComponentQuizType;

  // TODO: Should find a way to make answer check generic as different component quiz types need different check answer as user's input could be in variety of value types
  // But now it's only string!

  const handleChange = (e: unknown) => {
    if (!isActive) return;

    setIsCorrect(null);
    setUserAnswer(e);
  };

  const handleCheckAnswer = () => {
    if (userAnswer === null) return;

    setIsCorrect(String(userAnswer) === quizBlock.answer);
  };

  return (
    <>
      <QuizLayout content={quiz.content}>
        <ComponentRenderer
          component={quizBlock.componentName}
          props={{
            onAnswer: handleChange,
            isActive,
          }}
        />
        {isCorrect === false && <p>😩 Incorrect</p>}
        <ReactMarkdown>{quizBlock.afterContent}</ReactMarkdown>
      </QuizLayout>
      {isActive && !isCorrect && (
        <QuizActions
          disabled={userAnswer === null}
          onCheck={handleCheckAnswer}
        />
      )}
    </>
  );
};

export default ComponentQuiz;
