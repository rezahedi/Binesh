import { ClassAttributes, BaseHTMLAttributes } from "react";
import { ExtraProps } from "react-markdown";

const Paragraph = ({
  children,
  node,
  ...props
}: ClassAttributes<HTMLParagraphElement> &
  BaseHTMLAttributes<HTMLParagraphElement> &
  ExtraProps) => {
  const isOnlyImageOrComponent =
    node?.children.length === 1 &&
    "tagName" in node.children[0] &&
    (node.children[0].tagName === "img" ||
      node.children[0].tagName === "component");

  if (isOnlyImageOrComponent) {
    return <>{children}</>;
  }

  return <p {...props}>{children}</p>;
};

export default Paragraph;
