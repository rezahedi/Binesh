import InteractiveQuizComponent from "@/components/Interactive/InteractiveQuizComponent";
import InteractiveComponent from "@/components/Interactive/InteractiveComponent";
import Fraction from "@/components/Interactive/Fraction";
import FractionHalf from "@/components/Interactive/FractionHalf";
import FractionSplit from "@/components/Interactive/FractionSplit";
import LeverScale from "@/components/Interactive/weights/LeverScale";

export const componentRegistry = {
  InteractiveQuizComponent,
  InteractiveComponent,
  Fraction,
  FractionHalf,
  FractionSplit,
  LeverScale,
} as const;

export type RegistryComponentName = keyof typeof componentRegistry;
