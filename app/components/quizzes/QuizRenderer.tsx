import { QuizKind, QuizType } from "@/lib/quizParser";
import {
  ComponentQuiz,
  CheckListQuiz,
  FillInQuiz,
  RadioQuiz,
  PickAndFillQuiz,
  PlacementQuiz,
  SentenceBuilderQuiz,
} from ".";
import { QuizProvider } from "@/contexts/QuizContext";

export interface IQuizProp {
  quiz: QuizType & { id: string };
  isActive: boolean;
  quizResult: boolean | null;
  onCheck: (state: boolean | null) => void;
}

const quizComponentMap: Record<QuizKind, React.FC<IQuizProp>> = {
  component: ComponentQuiz,
  radio: RadioQuiz,
  checkList: CheckListQuiz,
  fill: FillInQuiz,
  pickAndFill: PickAndFillQuiz,
  placement: PlacementQuiz,
  sentenceBuilder: SentenceBuilderQuiz,
};

const QuizRenderer = (prop: IQuizProp) => {
  const Component = quizComponentMap[prop.quiz.type];
  return (
    <QuizProvider>
      <Component {...prop} />
    </QuizProvider>
  );
};

export default QuizRenderer;
