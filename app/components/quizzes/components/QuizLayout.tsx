import { ReactNode } from "react";
import ReactMarkdown from "@/lib/markdown";

const QuizLayout = ({
  content,
  children,
}: {
  content: string;
  children: ReactNode;
}) => {
  return (
    <>
      <div className="flex-10">
        <div className="my-4 p-6 px-8 rounded-xl bg-card space-y-4">
          <ReactMarkdown>{content}</ReactMarkdown>
          {children}
        </div>
      </div>
    </>
  );
};

export default QuizLayout;
