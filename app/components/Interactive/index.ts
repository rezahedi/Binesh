import Test from "./Test";

export const componentRegistry = {
  Test,
} as const;

export type RegistryComponentName = keyof typeof componentRegistry;
