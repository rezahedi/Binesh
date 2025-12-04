import { QuizKind, QuizType } from "@/lib/quizParser";
import { CheckListQuiz, FillInQuiz, RadioQuiz } from "./";

// FIXME: Provide a unique ID for each step, to use it in Id-ing inputs, labels and etc.

export interface IQuizProp {
  quiz: QuizType;
  isActive: boolean;
  quizResult: boolean | null;
  onCheck: (state: boolean | null) => void;
}

const quizComponentMap: Record<QuizKind, React.FC<IQuizProp>> = {
  radio: RadioQuiz,
  checkList: CheckListQuiz,
  fill: FillInQuiz,
};

const QuizRenderer = (prop: IQuizProp) => {
  const Component = quizComponentMap[prop.quiz.type];
  return <Component {...prop} />;
};

export default QuizRenderer;
