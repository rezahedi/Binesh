import { ComponentQuizType } from "@/lib/quizParser";
import { useState } from "react";
import ReactMarkdown from "@/lib/markdown";
import { IQuizProp } from "@/components/quizzes/QuizRenderer";
import { FlagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentRenderer } from "@/components/Interactive/ComponentRenderer";

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
      <div className="flex-10">
        <div className="my-4 p-6 px-8 rounded-xl bg-card">
          <ReactMarkdown>{quiz.content}</ReactMarkdown>
          <ComponentRenderer
            component={quizBlock.componentName}
            props={{
              onAnswer: handleChange,
              isActive,
            }}
          />
          {isCorrect !== null && (
            <p>{isCorrect ? "🎉 Correct" : "😩 Incorrect"}</p>
          )}
          <ReactMarkdown>{quizBlock.afterContent}</ReactMarkdown>
        </div>
      </div>
      {isActive && !isCorrect && (
        <div className="flex gap-2 items-center sticky bottom-0 bg-background py-3">
          <div className="flex-1">
            <Button
              variant={"ghost"}
              className="text-muted-foreground"
              size={"sm"}
            >
              <FlagIcon className="size-4" /> Report
            </Button>
          </div>
          <Button
            onClick={handleCheckAnswer}
            disabled={userAnswer === null}
            className="font-semibold"
          >
            Check It
          </Button>
        </div>
      )}
    </>
  );
};

export default ComponentQuiz;
