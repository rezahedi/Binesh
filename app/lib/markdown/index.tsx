import Img from "./Img";
import Markdown from "react-markdown";

const markdownComponents = {
  img: Img,
};

const ReactMarkdown = ({ children }: { children?: string | null }) => {
  if (children) return null;

  return <Markdown components={markdownComponents}>{children}</Markdown>;
};

export default ReactMarkdown;
