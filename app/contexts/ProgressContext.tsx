import { createContext, useContext, useState } from "react";
import useTrophy from "@/hooks/useTrophy";
import { GetUserPointsResponse, StreakResponse } from "@trophyso/node/api";
import { IUseStats } from "@/hooks/useStats";
import {
  lessonCompleted,
  quizPassed,
  stepPassed,
} from "@/(learningMode)/actions/trophy";
import { useUser } from "@stackframe/stack";

type ContextType = {
  cells: number | null;
  decreaseCell: () => void;
  increaseCell: () => void;
  streak: StreakResponse | null;
  points: GetUserPointsResponse | null;
  isLoading: boolean;
  currentStep: number;
  nextStep: () => void;
  totalSteps: number | null;
  startLesson: (steps: number) => void;
  isFinished: boolean;
  stats: IUseStats;
  quizAnswered: (isPassed: boolean) => void;
  lessonFinished: () => void;
};

const ProgressContext = createContext<ContextType | undefined>(undefined);

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [totalSteps, setTotalSteps] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const {
    cells,
    decreaseCell,
    increaseCell,
    streak,
    points,
    isLoading,
    stats,
  } = useTrophy();

  const startLesson = (steps: number) => {
    setTotalSteps(steps);
    stats.setStartTime();
  };

  const nextStep = () => {
    if (!user || totalSteps === null) return;

    stepPassed(user.id);
    stats.handlePassedPart();
    if (currentStep === totalSteps) {
      return setIsFinished(true);
    }

    setCurrentStep((prev) => prev + 1);
  };

  const quizAnswered = (isPassed: boolean) => {
    if (!user) return;

    if (!isPassed) {
      decreaseCell();
      stats.handleFailedQuiz();
      return;
    }

    stats.handlePassedQuiz();
    quizPassed(user.id);
  };

  const lessonFinished = () => {
    if (!user) return;

    lessonCompleted(user.id);
    stats.setEndTime();
  };

  return (
    <ProgressContext.Provider
      value={{
        cells,
        decreaseCell,
        increaseCell,
        streak,
        points,
        isLoading,
        currentStep,
        nextStep,
        totalSteps,
        startLesson,
        isFinished,
        stats,
        quizAnswered,
        lessonFinished,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within its provider");
  }
  return context;
};

export { ProgressProvider, useProgress };
