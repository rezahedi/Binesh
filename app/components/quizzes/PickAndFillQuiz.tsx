import { PickAndFillQuizType } from "@/lib/quizParser";
import React, { useState } from "react";
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
  const [userAnswer, setUserAnswer] = useState<
    { index: number; value: string }[]
  >([]);
  const [options, setOptions] = useState<string[]>(quizBlock.options);
  const contentParts = quizBlock.content.split("[ ]");

  const handleCheckAnswer = () => {
    if (userAnswer.length === 0) return;

    if (userAnswer.length !== quizBlock.answers.length)
      return setIsCorrect(false);

    setIsCorrect(userAnswer.every((v, i) => quizBlock.answers[i] === v.value));
  };

  const handleSelectWord = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    word: string
  ) => {
    if (!isActive) return;

    // If userAnswer.length is less push the new word
    if (userAnswer.length < quizBlock.answers.length) {
      setOptions((prev) => prev.filter((v) => v != word));
      setUserAnswer((prev) => [
        ...prev,
        { index: userAnswer.length, value: word },
      ]);
      return;
    }

    // If userAnswer.length was equal iterate through the array and find an empty slot
    const freeSlotIndex = userAnswer.findIndex((slot) => slot.value === "");
    if (freeSlotIndex === -1) return;

    setOptions((prev) => prev.filter((v) => v != word));
    setUserAnswer((prev) =>
      prev.map((slot, i) => ({
        index: slot.index,
        value: freeSlotIndex === i ? word : slot.value,
      }))
    );
  };

  const handleDetach = (index: number) => {
    if (!isActive || userAnswer[index].value === "") return;

    const value = userAnswer[index].value;
    setUserAnswer((prev) =>
      prev.map((_, i) => ({
        index: i,
        value: i === index ? "" : prev[i].value,
      }))
    );
    setOptions((prev) => [...prev, value]);
    return;
  };

  return (
    <>
      <QuizLayout content={quiz.content}>
        {contentParts.map((part, index) => (
          <span key={index}>
            {part}
            {index < contentParts.length - 1 && (
              <input
                className={cn(
                  `w-20 mx-2 rounded-xl p-2 px-3 cursor-pointer text-center font-medium border-2 border-border hover:border-quiz-select-300 hover:bg-quiz-select-50 field-sizing-content max-w-2xs`,
                  isCorrect !== null
                    ? isCorrect === true
                      ? `border-quiz-success-300 bg-quiz-success-50 text-quiz-success-700`
                      : `border-quiz-error-300 bg-quiz-error-50 text-quiz-error-700`
                    : ``,
                  !isActive && `pointer-events-none`
                )}
                id={quiz.id}
                name={quiz.id}
                value={userAnswer[index]?.value || ""}
                onClick={() => handleDetach(index)}
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
              onClick={(e) => handleSelectWord(e, option)}
            >
              {option}
            </Button>
          ))}
        </div>
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

export default PickAndFillQuiz;
