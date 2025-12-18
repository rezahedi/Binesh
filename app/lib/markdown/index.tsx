import ComponentMapper from "./ComponentMapper";
import Img from "./Img";
import Paragraph from "./Paragraph";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import rehypeRaw from "rehype-raw";

const markdownComponents = {
  component: ComponentMapper,
  img: Img,
  p: Paragraph,
};

const ReactMarkdown = ({ children }: { children?: string | null }) => {
  if (!children) return null;

  return (
    <div className="content">
      <Markdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={markdownComponents}
      >
        {children}
      </Markdown>
    </div>
  );
};

export default ReactMarkdown;
