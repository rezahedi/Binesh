import {
  componentRegistry,
  RegistryComponentName,
} from "@/components/Interactive";

type ComponentRendererProps = {
  component: string;
  componentProps?: Record<string, unknown>;
};

export function ComponentRenderer({
  component,
  componentProps,
}: ComponentRendererProps) {
  const Component = componentRegistry[component as RegistryComponentName];
  if (!Component) return null;

  return <Component {...componentProps} />;
}
