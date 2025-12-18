import InteractiveQuizComponent from "@/components/Interactive/InteractiveQuizComponent";
import InteractiveComponent from "@/components/Interactive/InteractiveComponent";

export const componentRegistry = {
  InteractiveQuizComponent,
  InteractiveComponent,
} as const;

export type RegistryComponentName = keyof typeof componentRegistry;
