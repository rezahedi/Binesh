import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ContextType = {
  currentStep: number;
  nextStep: () => void;
  totalSteps: number | null;
  setTotalSteps: Dispatch<SetStateAction<number | null>>;
};

const ProgressContext = createContext<ContextType | undefined>(undefined);

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [totalSteps, setTotalSteps] = useState<number | null>(null);

  const nextStep = () => {
    if (totalSteps === null || currentStep >= totalSteps) return;
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <ProgressContext.Provider
      value={{
        currentStep,
        nextStep,
        totalSteps,
        setTotalSteps,
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
