import InteractiveQuizComponent from "./InteractiveQuizComponent";
import InteractiveComponent from "./InteractiveComponent";

export const componentRegistry = {
  InteractiveQuizComponent,
  InteractiveComponent,
} as const;

export type RegistryComponentName = keyof typeof componentRegistry;
