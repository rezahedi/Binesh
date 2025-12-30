import { SentenceBuilderQuizType } from "@/lib/quizParser";
import { IQuizProp } from "./QuizRenderer";
import { QuizActions, QuizLayout } from "./components";
import { Button } from "../ui/button";
import { cn } from "@/utils/cn";
import { useState } from "react";

const SentenceBuilderQuiz = ({
  quiz,
  isActive,
  quizResult: isCorrect,
  onCheck: setIsCorrect,
}: IQuizProp) => {
  const quizBlock = quiz.quizBlock as SentenceBuilderQuizType;
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>(shuffle(quizBlock.options));

  const isSentenceCompleted = userAnswer.length === quizBlock.options.length;

  const handleCheckAnswer = () => {
    if (!isSentenceCompleted) return;

    setIsCorrect(userAnswer.every((v, i) => quizBlock.options[i] === v));
  };

  const handleOptionClick = (word: string) => {
    if (!isActive) return;

    setOptions((prev) => prev.filter((v) => v != word));
    setUserAnswer((prev) => [...prev, word]);
  };

  const handlePartClick = (word: string) => {
    if (!isActive) return;

    setUserAnswer((prev) => prev.filter((v) => v != word));
    setOptions((prev) => [...prev, word]);
  };

  return (
    <>
      <QuizLayout content={quiz.content}>
        {userAnswer.map((part, index) => (
          <span
            key={index}
            className="leading-12"
            onClick={() => handlePartClick(part)}
          >
            {part}{" "}
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
        <QuizActions
          disabled={!isSentenceCompleted}
          onCheck={handleCheckAnswer}
        />
      )}
    </>
  );
};

export default SentenceBuilderQuiz;

const shuffle = (array: string[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
