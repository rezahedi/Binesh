import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import useCells from "./useCells";

type ContextType = {
  cells: number | null;
  decrease: () => void;
  increase: () => void;
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
  const { cells, decrease, increase, isLoading } = useCells();

  const nextStep = () => {
    if (totalSteps === null) return;

    if (currentStep === totalSteps) return setFinishedState(true);

    setCurrentStep((prev) => prev + 1);
  };

  return (
    <ProgressContext.Provider
      value={{
        cells,
        decrease,
        increase,
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
