import {QuizKind, QuizType} from "@/lib/quizParser";
import {CheckListQuiz, FillInQuiz, RadioQuiz} from "./";

const quizComponentMap: Record<
  QuizKind,
  React.FC<{
    quiz: QuizType;
    isActive: boolean;
    onCheck: (state: boolean) => void;
  }>
> = {
  radio: RadioQuiz,
  checkList: CheckListQuiz,
  fill: FillInQuiz,
};

export default quizComponentMap;
