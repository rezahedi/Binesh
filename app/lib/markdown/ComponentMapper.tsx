import { RegistryComponentName } from "@/components/Interactive";
import { ComponentRenderer } from "@/components/Interactive/ComponentRenderer";
import type { Element } from "hast";

export default function ComponentMapper({ node }: { node: Element }) {
  const { name, props } = node.properties;
  if (!name || typeof name !== "string") return null;

  let componentProps = {};
  try {
    componentProps = JSON.parse(String(props) || "{}");
  } catch (_) {
    componentProps = {};
  }

  return (
    <ComponentRenderer
      component={name as RegistryComponentName}
      componentProps={componentProps}
    />
  );
}
