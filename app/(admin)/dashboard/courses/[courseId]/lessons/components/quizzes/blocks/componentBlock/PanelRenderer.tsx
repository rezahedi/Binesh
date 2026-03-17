import { panelRegistry, PanelRegistryName } from "@/components/Interactive";
import DefaultPanel from "./DefaultPanel";
import { DUMMY_INTERACTIVE_COMPONENTS } from "../../types";

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
  const componentDetail = DUMMY_INTERACTIVE_COMPONENTS.find(
    (c) => c.name === component
  );

  if (Component) return <Component props={props} onChange={onChange} />;

  if (componentDetail)
    return (
      <DefaultPanel
        props={componentDetail.props}
        propValues={props}
        onChange={onChange}
      />
    );

  return <div>No Config Panel!</div>;
}
