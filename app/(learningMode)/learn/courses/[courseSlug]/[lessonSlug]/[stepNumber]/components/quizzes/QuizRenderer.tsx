import {QuizType} from "@/lib/quizParser";
import quizComponentMap from "./QuizzesMap";

const QuizRenderer = ({quiz}: {quiz: QuizType}) => {
  const Component = quizComponentMap[quiz.type];
  return <Component quiz={quiz} />;
};

export default QuizRenderer;
