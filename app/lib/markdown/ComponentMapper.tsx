import { ComponentRenderer } from "@/components/Interactive/Renderer";
import type { Element } from "hast";

export default function ComponentMapper({ node }: { node: Element }) {
  const { name, ...props } = node.properties;
  if (!name || typeof name !== "string") return null;

  return <ComponentRenderer component={name} props={props} />;
}
