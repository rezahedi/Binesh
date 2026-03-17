import { panelRegistry, PanelRegistryName } from "@/components/Interactive";

type PanelRendererProps = {
  component: string;
  props?: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
};

export function PanelRenderer({
  component,
  props,
  onChange,
}: PanelRendererProps) {
  const Component = panelRegistry[component as PanelRegistryName];

  if (!Component) return <p>Component don&apos;t have Config Panel!</p>;

  return <Component props={props} onChange={onChange} />;
}
