import InteractiveQuizComponent from "@/components/Interactive/InteractiveQuizComponent";
import InteractiveComponent from "@/components/Interactive/InteractiveComponent";
import Fraction from "@/components/Interactive/Fraction";
import SquareFractionQuiz from "@/components/Interactive/SquareFractionQuiz";
import LeverScale, {
  LeverScaleConfig,
} from "@/components/Interactive/LeverScale";

// Component Registry
export const componentRegistry = {
  InteractiveQuizComponent,
  InteractiveComponent,
  Fraction,
  SquareFractionQuiz,
  LeverScale,
} as const;

export type Registry = typeof componentRegistry;
export type RegistryComponentName = keyof Registry;

// Config Panel Registry
export const panelRegistry = {
  LeverScale: LeverScaleConfig,
} as const;

export type PanelRegistry = typeof panelRegistry;
export type PanelRegistryName = keyof PanelRegistry;
