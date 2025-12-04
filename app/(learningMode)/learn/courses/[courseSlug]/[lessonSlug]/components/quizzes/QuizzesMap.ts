import { QuizKind, QuizType } from "@/lib/quizParser";
import { CheckListQuiz, FillInQuiz, RadioQuiz } from "./";

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

export default quizComponentMap;
