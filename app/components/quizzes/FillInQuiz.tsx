import { FillQuizType } from "@/lib/quizParser";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import ReactMarkdown from "@/lib/markdown";
import { IQuizProp } from "@/components/quizzes/QuizRenderer";
import { FlagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const FillInQuiz = ({
  quiz,
  isActive,
  quizResult: isCorrect,
  onCheck: setIsCorrect,
}: IQuizProp) => {
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const quizBlock = quiz.quizBlock as FillQuizType;
  const [pre, suf] = quizBlock.content.split("[ ]");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) return;

    setIsCorrect(null);
    setUserAnswer(e.target.value);
  };

  const handleCheckAnswer = () => {
    if (userAnswer === null) return;

    let result: boolean;

    if (quizBlock.inputType === "string")
      result = userAnswer.toLowerCase() === quizBlock.answer.toLowerCase();
    else result = userAnswer === quizBlock.answer;

    setIsCorrect(result);
  };

  return (
    <>
      <div className="flex-10">
        <div className="my-4 p-6 px-8 rounded-xl bg-card">
          <ReactMarkdown>{quiz.content}</ReactMarkdown>
          {pre}
          <input
            className={cn(
              `rounded-xl p-2 px-3 text-center font-medium border-2 border-border hover:border-quiz-select-300 hover:bg-quiz-select-50 field-sizing-content max-w-2xs`,
              quizBlock.inputType == "number" &&
                `[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`,
              isCorrect !== null
                ? isCorrect === true
                  ? `border-quiz-success-300 bg-quiz-success-50 text-quiz-success-700`
                  : `border-quiz-error-300 bg-quiz-error-50 text-quiz-error-700`
                : ``,
              !isActive && `pointer-events-none`
            )}
            id={quiz.id}
            name={quiz.id}
            type={quizBlock.inputType}
            size={quizBlock.answer.length}
            style={{
              minWidth: `${quizBlock.answer.length + (quizBlock.inputType == "number" ? 3 : 0)}em`,
            }}
            defaultValue={userAnswer || ""}
            onChange={handleChange}
            readOnly={!isActive}
          />
          {suf}
        </div>
        {isCorrect !== null && (
          <p>{isCorrect ? "🎉 Correct" : "😩 Incorrect"}</p>
        )}
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
            Check
          </Button>
        </div>
      )}
    </>
  );
};

export default FillInQuiz;
