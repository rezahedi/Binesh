import InteractiveQuizComponent from "@/components/Interactive/InteractiveQuizComponent";
import InteractiveComponent from "@/components/Interactive/InteractiveComponent";
import Fraction from "@/components/Interactive/Fraction";
import SquareFractionQuiz from "@/components/Interactive/SquareFractionQuiz";
import LeverScale from "@/components/Interactive/LeverScale";

export const componentRegistry = {
  InteractiveQuizComponent,
  InteractiveComponent,
  Fraction,
  SquareFractionQuiz,
  LeverScale,
} as const;

export type Registry = typeof componentRegistry;
export type RegistryComponentName = keyof Registry;
