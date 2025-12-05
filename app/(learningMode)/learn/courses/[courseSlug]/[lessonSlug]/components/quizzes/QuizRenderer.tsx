import { QuizKind, QuizType } from "@/lib/quizParser";
import { CheckListQuiz, FillInQuiz, RadioQuiz } from "./";

export interface IQuizProp {
  quiz: QuizType & { id: string };
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
