"use client";

import { createContext, useContext, useState } from "react";

type ContextType = {
  userAnswer: string | null;
  setUserAnswer: (answer: string | null) => void;
  userAnswers: string[];
  setUserAnswers: (answer: string[]) => void;
  setUserAnswerByIndex: (index: number, value: string) => void;
  revealResult: boolean;
  setRevealResult: (result: boolean) => void;
};

export const QuizContext = createContext<ContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [revealResult, setRevealResult] = useState<boolean>(false);

  const userAnswer = userAnswers[0] === undefined ? null : userAnswers[0];

  const setUserAnswer = (value: string | null) => {
    setUserAnswers(value ? [value] : []);
  };

  const setUserAnswerByIndex = (index: number, value: string) => {
    setUserAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = value;
      return newAnswers;
    });
  };

  return (
    <QuizContext.Provider
      value={{
        userAnswer,
        setUserAnswer,
        userAnswers,
        setUserAnswers,
        setUserAnswerByIndex,
        revealResult,
        setRevealResult,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within its provider");
  }
  return context;
};
