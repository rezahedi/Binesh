import {QuizType} from "@/lib/quizParser";
import quizComponentMap from "./QuizzesMap";

const QuizRenderer = ({
  quiz,
  isActive,
}: {
  quiz: QuizType;
  isActive: boolean;
}) => {
  const Component = quizComponentMap[quiz.type];
  return <Component quiz={quiz} isActive={isActive} />;
};

export default QuizRenderer;
