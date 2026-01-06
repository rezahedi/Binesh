"use client";

import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { cn } from "./utils/cn";
import { useRouter } from "next/navigation";
import { shuffle } from "./components/quizzes/SentenceBuilderQuiz";

const SLOGAN = [
  "Interactive problem",
  "solving",
  "that",
  "is effective",
  "and fun.",
  "Excel",
  "in math",
  "and computer",
  "science.",
];

const TIMER_PER_PART = 100;

type Option = { index: number; value: string; animate: boolean };

const SloganBuilder = () => {
  const [userAnswer, setUserAnswer] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const router = useRouter();

  const isSentenceCompleted = userAnswer.length === SLOGAN.length;

  useEffect(() => {
    if (options.length === 0)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOptions(shuffle(SLOGAN).map((v) => ({ ...v, animate: false })));
  }, []);

  useEffect(() => {
    if (isCorrect !== true) return;

    userAnswer.forEach((_, i) => {
      setTimeout(() => {
        setUserAnswer((prev) =>
          prev.map((p, index) => (index === i ? { ...p, animate: true } : p))
        );
      }, i * TIMER_PER_PART);
    });

    if (router)
      setTimeout(
        () => router.push("/handler/sign-in"),
        TIMER_PER_PART * SLOGAN.length
      );
  }, [isCorrect]);

  const handleCheckAnswer = () => {
    if (!isSentenceCompleted) return;

    setIsCorrect(userAnswer.every((v, i) => SLOGAN[i] === v.value));
  };

  const handleOptionClick = (index: number) => {
    const word = options.find((v) => v.index === index);
    if (!word) return;

    setOptions((prev) =>
      prev.map((p) => ({
        index: p.index,
        value: p.index === index ? "" : p.value,
        animate: false,
      }))
    );
    setUserAnswer((prev) => [...prev, word]);
  };

  const handlePartClick = (index: number) => {
    setIsCorrect(null);

    const word = userAnswer.find((v) => v.index === index);
    if (!word) return;

    setUserAnswer((prev) => prev.filter((v) => v.index != index));
    setOptions((prev) => prev.map((p) => (p.index === index ? word : p)));
  };

  return (
    <div className="sm:max-w-3xl mx-4 sm:mx-auto">
      <h2 className="font-semibold text-4xl sm:text-5xl my-8 leading-tight">
        Learning Start Here
      </h2>
      <div
        className={cn(
          "grid auto-rows-fr gap-6 mb-4",
          isCorrect === true && "pointer-events-none"
        )}
      >
        <div className="relative h-full">
          <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden **:border-b **:h-[53px] **:mb-[9px] sm:**:h-14 sm:**:mb-3.5">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="flex gap-x-2 gap-y-4 sm:gap-y-6 flex-wrap">
            {userAnswer.map((part, i) => (
              <Button
                key={part.index}
                variant={"outline"}
                tabIndex={0}
                className={cn(
                  "border rounded-xl",
                  part.index === 0 && "bg-secondary-light",
                  part.animate &&
                    "border shadow-none translate-y-1 transition-all"
                )}
                onClick={() => handlePartClick(part.index)}
              >
                {part.value}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex gap-x-2 gap-y-4 sm:gap-y-6 flex-wrap justify-center sm:gap-x-4">
          {options.map((option) => (
            <Button
              key={option.index}
              variant={"outline"}
              tabIndex={0}
              className={cn(
                "border rounded-xl mb-2",
                option.index === 0 && "bg-secondary-light",
                option.value === "" &&
                  "border-muted/50 shadow-muted/50 bg-muted/50"
              )}
              disabled={option.value === ""}
              onClick={() => handleOptionClick(option.index)}
            >
              {option.value === "" ? (
                <span className="invisible">
                  {userAnswer.find((v) => v.index === option.index)?.value}
                </span>
              ) : (
                option.value
              )}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <p className="font-semibold mb-3 text-secondary-dark">
          {isCorrect !== null ? (
            <>
              {isCorrect === false
                ? "You can do better, try again."
                : "Perfect, Redirecting to learning mode."}
            </>
          ) : (
            <>&nbsp;</>
          )}
        </p>
        <Button
          variant={"primary"}
          disabled={!isSentenceCompleted}
          onClick={handleCheckAnswer}
          className="text-lg py-4 px-14"
        >
          {isSentenceCompleted
            ? "Check Answer and start"
            : "Solve quiz to start!"}
        </Button>
      </div>
    </div>
  );
};

export default SloganBuilder;
