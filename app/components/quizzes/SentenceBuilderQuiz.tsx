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

    // quizBlock.options have the correct order.
    setIsCorrect(userAnswer.every((v, i) => quizBlock.options[i] === v));
  };

  const handleOptionClick = (index: number) => {
    if (!isActive) return;

    const word = options[index];

    setOptions((prev) => prev.filter((_, i) => i != index));
    setUserAnswer((prev) => [...prev, word]);
  };

  const handlePartClick = (index: number) => {
    if (!isActive) return;

    const word = userAnswer[index];

    setUserAnswer((prev) => prev.filter((_, i) => i != index));
    setOptions((prev) => [...prev, word]);
  };

  return (
    <>
      <QuizLayout content={quiz.content}>
        <div className={cn(!isActive && `pointer-events-none`)}>
          {userAnswer.map((part, index) => (
            <span key={index} className="inline-block border-b pb-2 h-fit">
              <Button
                variant={"outline"}
                tabIndex={0}
                className="border rounded-xl mx-1 my-2"
                onClick={() => handlePartClick(index)}
              >
                {part}{" "}
              </Button>
            </span>
          ))}
        </div>
        <div className="pt-10 flex gap-6 justify-center flex-wrap">
          {options.map((option, index) => (
            <Button
              key={index}
              variant={"outline"}
              tabIndex={0}
              className="border rounded-xl"
              onClick={() => handleOptionClick(index)}
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
  if (array.length <= 1) return array;

  const shuffled = [...array];
  let similarity = 1;

  do {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    similarity =
      shuffled.filter((v, i) => v === array[i]).length / array.length;
  } while (similarity > 0.3);

  return shuffled;
};
