import Img from "./Img";
import Paragraph from "./Paragraph";
import Markdown from "react-markdown";

const markdownComponents = {
  img: Img,
  p: Paragraph,
};

const ReactMarkdown = ({ children }: { children?: string | null }) => {
  if (!children) return null;

  return <Markdown components={markdownComponents}>{children}</Markdown>;
};

export default ReactMarkdown;
