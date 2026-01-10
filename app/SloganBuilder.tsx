"use client";

import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { cn } from "./utils/cn";
import { shuffle } from "./components/quizzes/SentenceBuilderQuiz";
import { useAuthModal } from "@/contexts/AuthModalContext";

const SLOGAN = [
  "Transform",
  "curiosity",
  "into",
  "deep",
  "understanding",
  "through",
  "interactive",
  "platform.",
];

const TIMER_PER_PART = 100;

type Option = { index: number; value: string };

const SloganBuilder = () => {
  const [userAnswer, setUserAnswer] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const { showSignup } = useAuthModal();

  const isSentenceCompleted = userAnswer.length === SLOGAN.length;

  useEffect(() => {
    if (options.length === 0)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOptions(shuffle(SLOGAN));
  }, []);

  useEffect(() => {
    if (isCorrect !== true) return;

    const timer = setTimeout(
      showSignup,
      ANIMATE_DELAY_PER_PART * SLOGAN.length * 2
    );

    return () => {
      clearTimeout(timer);
    };
  }, [isCorrect]);

  const handleCheckAnswer = () => {
    if (!isSentenceCompleted) return;

    if (isCorrect === true) return showSignup();

    setIsCorrect(userAnswer.every((v, i) => SLOGAN[i] === v.value));

    // Show a hint once on first mistake
    if (hint !== "") setHint("");
    if (hint === null) {
      const mismatchIndex = userAnswer.findIndex(
        (v, i) => SLOGAN[i] !== v.value
      );
      setHint(
        mismatchIndex > 0
          ? `Not quite yet, Put ${SLOGAN[mismatchIndex]} after ${SLOGAN[mismatchIndex - 1]}`
          : `No way, Start with the colored one.`
      );
    }
  };

  const handleOptionClick = (index: number) => {
    const word = options.find((v) => v.index === index);
    if (!word) return;

    setOptions((prev) =>
      prev.map((p) => ({
        index: p.index,
        value: p.index === index ? "" : p.value,
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
      <h2 className="font-md-serif text-4xl sm:text-5xl mt-8 mb-1 leading-tight">
        Learning Start Here
      </h2>
      <p className="mb-8 text-foreground/80 sm:text-lg text-balance">
        Put the words in the correct order to form a perfect sentence.
      </p>
      <div
        className={cn(
          "grid auto-rows-fr gap-6 mb-4",
          isCorrect === true && "pointer-events-none"
        )}
      >
        <div className="relative h-full">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden **:border-b **:h-[53px] **:mb-[9px] sm:**:h-14 sm:**:mb-3.5 pointer-events-none">
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
                  "rounded-xl max-sm:px-4",
                  part.index === 0 &&
                    "not-dark:bg-secondary-light dark:text-secondary-dark dark:border-secondary-dark dark:shadow-secondary-dark",
                  isCorrect &&
                    "not-dark:bg-background border-primary-light text-primary-dark dark:text-primary-light shadow-primary dark:border-primary dark:shadow-primary animate-bounce-once"
                )}
                {...(isCorrect && {
                  style: { animationDelay: `${ANIMATE_DELAY_PER_PART * i}ms` },
                })}
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
                "rounded-xl max-sm:px-4 mb-2",
                option.index === 0 &&
                  option.value !== "" &&
                  "not-dark:bg-secondary-light dark:border-secondary-dark dark:shadow-secondary-dark dark:text-secondary-dark",
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
                ? hint
                  ? hint
                  : "You can do better, try again."
                : "Perfect"}
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
            ? isCorrect
              ? "Sign up Now"
              : "Check the Answer"
            : "Solve the quiz to start!"}
        </Button>
      </div>
    </div>
  );
};

export default SloganBuilder;
