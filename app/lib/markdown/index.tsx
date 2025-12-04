import Img from "./Img";
import Paragraph from "./Paragraph";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const markdownComponents = {
  img: Img,
  p: Paragraph,
};

const ReactMarkdown = ({ children }: { children?: string | null }) => {
  if (!children) return null;

  return (
    <Markdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={markdownComponents}
    >
      {children}
    </Markdown>
  );
};

export default ReactMarkdown;
