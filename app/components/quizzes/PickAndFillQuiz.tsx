import { PickAndFillQuizType } from "@/lib/quizParser";
import { useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import { IQuizProp } from "@/components/quizzes/QuizRenderer";
import { QuizLayout, QuizActions } from "./components";
import { Button } from "../ui/button";

const PickAndFillQuiz = ({
  quiz,
  isActive,
  quizResult: isCorrect,
  onCheck: setIsCorrect,
}: IQuizProp) => {
  const quizBlock = quiz.quizBlock as PickAndFillQuizType;
  const [userAnswer, setUserAnswer] = useState<{ value: string }[]>(
    quizBlock.answers.map(() => ({ value: "" }))
  );
  const [options, setOptions] = useState<string[]>(quizBlock.options);
  const contentParts = quizBlock.content.split("[ ]");

  const emptyBlankIndex = useMemo(
    () => userAnswer.findIndex((b) => b.value === ""),
    [userAnswer]
  );
  const isSomeBlanksEmpty = emptyBlankIndex !== -1;

  const handleCheckAnswer = () => {
    if (isSomeBlanksEmpty) return;

    setIsCorrect(userAnswer.every((v, i) => quizBlock.answers[i] === v.value));
  };

  const handleOptionClick = (word: string) => {
    if (!isActive || !isSomeBlanksEmpty) return;

    setOptions((prev) => prev.filter((v) => v != word));
    setUserAnswer((prev) => {
      const next = [...prev];
      next[emptyBlankIndex] = { value: word };
      return next;
    });
  };

  const handleBlankClick = (blankIndex: number) => {
    const word = userAnswer[blankIndex].value;
    if (!isActive || !word) return;

    setUserAnswer((prev) => {
      const next = [...prev];
      next[blankIndex] = { value: "" };
      return next;
    });
    setOptions((prev) => [...prev, word]);
  };

  return (
    <>
      <QuizLayout content={quiz.content}>
        {contentParts.map((part, index) => (
          <span key={index} className="leading-12">
            {part}
            {index < contentParts.length - 1 && (
              <input
                className={cn(
                  `w-fit min-w-20 m-1 rounded-xl p-2 px-3 cursor-pointer leading-8 text-center font-medium border-2 border-border hover:border-quiz-select-300 hover:bg-quiz-select-50 field-sizing-content`,
                  !isActive && `pointer-events-none`
                )}
                id={quiz.id}
                name={quiz.id}
                value={userAnswer[index]?.value}
                onClick={() => handleBlankClick(index)}
                readOnly
              />
            )}
          </span>
        ))}
        <div className="pt-10 flex gap-6 justify-center flex-wrap">
          {options.map((option, index) => (
            <Button
              key={index}
              variant={"outline"}
              tabIndex={0}
              className={cn(
                "border rounded-xl",
                !isActive && `pointer-events-none`
              )}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </Button>
          ))}
        </div>
        {isCorrect !== null && <p>{!isCorrect ? "😩 Incorrect" : ""}</p>}
      </QuizLayout>
      {isActive && !isCorrect && (
        <QuizActions disabled={isSomeBlanksEmpty} onCheck={handleCheckAnswer} />
      )}
    </>
  );
};

export default PickAndFillQuiz;
