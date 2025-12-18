import { componentRegistry, RegistryComponentName } from ".";

type DynamicRendererProps = {
  component: string;
  props?: Record<string, unknown>;
};

export function DynamicRenderer({ component, props }: DynamicRendererProps) {
  const Component = componentRegistry[component as RegistryComponentName];

  if (!Component) return null;

  return <Component {...props} />;
}
