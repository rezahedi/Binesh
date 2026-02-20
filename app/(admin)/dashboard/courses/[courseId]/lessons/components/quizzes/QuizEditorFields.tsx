import {
  CheckListQuizType,
  FillQuizType,
  PickAndFillQuizType,
  PlacementQuizType,
  QuizBlock,
  QuizType,
  RadioQuizType,
  SentenceBuilderQuizType,
} from "@/lib/quizParser";
import CheckListBlock from "./blocks/CheckListBlock";
import FillBlock from "./blocks/FillBlock";
import PickAndFillBlock from "./blocks/PickAndFillBlock";
import PlacementBlock from "./blocks/PlacementBlock";
import RadioBlock from "./blocks/RadioBlock";
import SentenceBuilderBlock from "./blocks/SentenceBuilderBlock";

type QuizEditorFieldsProps = {
  quiz: QuizType;
  onQuizBlockChange: (quizBlock: QuizBlock) => void;
};

const QuizEditorFields = ({
  quiz,
  onQuizBlockChange,
}: QuizEditorFieldsProps) => {
  if (quiz.type === "radio") {
    return (
      <RadioBlock
        value={quiz.quizBlock as RadioQuizType}
        onChange={(next) => onQuizBlockChange(next)}
      />
    );
  }

  if (quiz.type === "checkList") {
    return (
      <CheckListBlock
        value={quiz.quizBlock as CheckListQuizType}
        onChange={(next) => onQuizBlockChange(next)}
      />
    );
  }

  if (quiz.type === "fill") {
    return (
      <FillBlock
        value={quiz.quizBlock as FillQuizType}
        onChange={(next) => onQuizBlockChange(next)}
      />
    );
  }

  if (quiz.type === "pickAndFill") {
    return (
      <PickAndFillBlock
        value={quiz.quizBlock as PickAndFillQuizType}
        onChange={(next) => onQuizBlockChange(next)}
      />
    );
  }

  if (quiz.type === "placement") {
    return (
      <PlacementBlock
        value={quiz.quizBlock as PlacementQuizType}
        onChange={(next) => onQuizBlockChange(next)}
      />
    );
  }

  if (quiz.type === "sentenceBuilder") {
    return (
      <SentenceBuilderBlock
        value={quiz.quizBlock as SentenceBuilderQuizType}
        onChange={(next) => onQuizBlockChange(next)}
      />
    );
  }

  return null;
};

export default QuizEditorFields;
