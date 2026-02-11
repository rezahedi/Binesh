import InteractiveQuizComponent from "@/components/Interactive/InteractiveQuizComponent";
import InteractiveComponent from "@/components/Interactive/InteractiveComponent";
import Fraction from "./Fraction";
import FractionHalf from "./FractionHalf";
import FractionSplit from "./FractionSplit";
import LeverScale from "./weights/LeverScale";

export type InteractiveComponentProps = {
  onChange?: (answer: string) => void;
  isActive?: boolean;
  props?: string;
};

export const componentRegistry = {
  InteractiveQuizComponent,
  InteractiveComponent,
  Fraction,
  FractionHalf,
  FractionSplit,
  LeverScale,
} as const;

export type RegistryComponentName = keyof typeof componentRegistry;
