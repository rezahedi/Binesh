import {
  componentRegistry,
  RegistryComponentName,
} from "@/components/Interactive";

type ComponentRendererProps = {
  component: string;
  props?: Record<string, unknown>;
};

export function DynamicRenderer({ component, props }: ComponentRendererProps) {
  const Component = componentRegistry[component as RegistryComponentName];

  if (!Component) return null;

  return <Component {...props} />;
}
