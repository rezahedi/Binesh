import ComponentMapper from "./ComponentMapper";
import Img from "./Img";
import Paragraph from "./Paragraph";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
// TODO: Sanitize if you are going to render users content (markdown) with rehype-sanitize

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
