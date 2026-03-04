"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { ANIMATE_DELAY_PER_PART } from "@/constants/learningMode";

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

const SHUFFLED_SLOGAN = [
  "platform.",
  "deep",
  "understanding",
  "through",
  "Transform",
  "interactive",
  "into",
  "curiosity",
];

const SloganBuilder = () => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const { showSignup } = useAuthModal();

  const userAnswer = selectedIndexes.map(
    (optionIndex) => SHUFFLED_SLOGAN[optionIndex] || ""
  );
  const isSentenceCompleted = selectedIndexes.length === SLOGAN.length;
  const firstWord = SLOGAN[0];

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

    const checkResult = userAnswer.every((value, i) => SLOGAN[i] === value);
    setIsCorrect(checkResult);

    if (checkResult) return;

    // Show a hint once on first mistake
    if (hint !== "") setHint("");
    if (hint === null) {
      const mismatchIndex = userAnswer.findIndex(
        (value, i) => SLOGAN[i] !== value
      );
      setHint(
        mismatchIndex > 0
          ? `Not quite yet, Put ${SLOGAN[mismatchIndex]} after ${SLOGAN[mismatchIndex - 1]}`
          : `No way, Start with the colored one.`
      );
    }
  };

  const handleOptionClick = (index: number) => {
    if (selectedIndexes.includes(index)) return;
    setSelectedIndexes((prev) => [...prev, index]);
  };

  const handlePartClick = (index: number) => {
    setIsCorrect(null);
    setSelectedIndexes((prev) => prev.filter((i) => i !== index));
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
            {selectedIndexes.map((optionIndex, i) => (
              <Button
                key={`${optionIndex}-${i}`}
                variant={"outline"}
                tabIndex={0}
                className={cn(
                  "rounded-xl max-sm:px-4",
                  SHUFFLED_SLOGAN[optionIndex] === firstWord &&
                    "not-dark:bg-secondary-light dark:text-secondary-dark dark:border-secondary-dark dark:shadow-secondary-dark",
                  isCorrect &&
                    "not-dark:bg-background border-primary-light text-primary-dark dark:text-primary-light shadow-primary dark:border-primary dark:shadow-primary animate-bounce-once"
                )}
                {...(isCorrect && {
                  style: { animationDelay: `${ANIMATE_DELAY_PER_PART * i}ms` },
                })}
                onClick={() => handlePartClick(optionIndex)}
              >
                {SHUFFLED_SLOGAN[optionIndex]}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex gap-x-2 gap-y-4 sm:gap-y-6 flex-wrap justify-center sm:gap-x-4">
          {SHUFFLED_SLOGAN.map((optionValue, optionIndex) => {
            const isPicked = selectedIndexes.includes(optionIndex);

            return (
              <Button
                key={optionIndex}
                variant={"outline"}
                tabIndex={0}
                className={cn(
                  "rounded-xl max-sm:px-4 mb-2",
                  optionValue === firstWord &&
                    !isPicked &&
                    "not-dark:bg-secondary-light dark:border-secondary-dark dark:shadow-secondary-dark dark:text-secondary-dark",
                  isPicked && "border-muted/50 shadow-muted/50 bg-muted/50"
                )}
                disabled={isPicked}
                onClick={() => handleOptionClick(optionIndex)}
              >
                {isPicked ? (
                  <span className="invisible">{optionValue}</span>
                ) : (
                  optionValue
                )}
              </Button>
            );
          })}
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
