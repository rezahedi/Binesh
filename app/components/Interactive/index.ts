import InteractiveQuizComponent from "@/components/Interactive/InteractiveQuizComponent";
import InteractiveComponent from "@/components/Interactive/InteractiveComponent";
import Fraction from "./Fraction";
import FractionHalf01 from "./FractionHalf01";
import FractionHalf02 from "./FractionHalf02";
import FractionHalf03 from "./FractionHalf03";
import FractionHalf04 from "./FractionHalf04";
import FractionSplit01 from "./FractionSplit01";
import FractionSplit02 from "./FractionSplit02";

export const componentRegistry = {
  InteractiveQuizComponent,
  InteractiveComponent,
  Fraction,
  FractionHalf01,
  FractionHalf02,
  FractionHalf03,
  FractionHalf04,
  FractionSplit01,
  FractionSplit02,
} as const;

export type RegistryComponentName = keyof typeof componentRegistry;
