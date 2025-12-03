import { QuizType } from "@/lib/quizParser";
import quizComponentMap from "./QuizzesMap";

const QuizRenderer = ({
  quiz,
  isActive,
  onCheck,
}: {
  quiz: QuizType;
  isActive: boolean;
  onCheck: (state: boolean) => void;
}) => {
  const Component = quizComponentMap[quiz.type];
  return <Component quiz={quiz} isActive={isActive} onCheck={onCheck} />;
};

export default QuizRenderer;
