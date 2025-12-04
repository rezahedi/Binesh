import quizComponentMap, { IQuizProp } from "./QuizzesMap";

const QuizRenderer = (prop: IQuizProp) => {
  const Component = quizComponentMap[prop.quiz.type];
  return <Component {...prop} />;
};

export default QuizRenderer;
