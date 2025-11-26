import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ContextType = {
  currentStep: number;
  stepCount: number | null;
  nextStep: () => void;
  setStepCount: Dispatch<SetStateAction<number | null>>;
};

const ProgressContext = createContext<ContextType | undefined>(undefined);

const ProgressProvider = ({children}: {children: React.ReactNode}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepCount, setStepCount] = useState<number | null>(null);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <ProgressContext.Provider
      value={{currentStep, stepCount, nextStep, setStepCount}}
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

export {ProgressProvider, useProgress};
