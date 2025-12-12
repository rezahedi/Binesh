import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import useTrophy from "@/(application)/useTrophy";
import { GetUserPointsResponse, StreakResponse } from "@trophyso/node/api";

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
  setTotalSteps: Dispatch<SetStateAction<number | null>>;
  finished: boolean;
};

const ProgressContext = createContext<ContextType | undefined>(undefined);

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [totalSteps, setTotalSteps] = useState<number | null>(null);
  const [finished, setFinishedState] = useState<boolean>(false);
  const { cells, decreaseCell, increaseCell, streak, points, isLoading } =
    useTrophy();

  const nextStep = () => {
    if (totalSteps === null) return;

    if (currentStep === totalSteps) return setFinishedState(true);

    setCurrentStep((prev) => prev + 1);
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
        setTotalSteps,
        finished,
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
