import {
  CheckListQuizType,
  FillQuizType,
  PickAndFillQuizType,
  PlacementQuizType,
  QuizType,
  RadioQuizType,
  SentenceBuilderQuizType,
} from "@/lib/quizParser";
import { EditableQuizKind } from "./types";

const defaultQuizBlocks: Record<
  EditableQuizKind,
  | RadioQuizType
  | CheckListQuizType
  | FillQuizType
  | PickAndFillQuizType
  | PlacementQuizType
  | SentenceBuilderQuizType
> = {
  radio: {
    options: ["Option 1", "Option 2"],
    answer: "Option 1",
  },
  checkList: {
    options: ["Option 1", "Option 2"],
    answers: ["Option 1"],
  },
  fill: {
    answer: "France",
    content: "The capital of [France] is Paris.",
  },
  pickAndFill: {
    options: ["Option 1", "Option 2"],
    answers: ["Option 1"],
    content: "[ ]",
  },
  placement: {
    aspectRatio: "1/1",
    zones: ["A", "B"],
    options: [
      { zone: "A", content: "Option 1" },
      { zone: "B", content: "Option 2" },
    ],
  },
  sentenceBuilder: {
    options: ["word1", "word2"],
  },
};

export const createDefaultQuiz = (type: EditableQuizKind): QuizType => {
  return {
    type,
    content: "",
    quizBlock: structuredClone(defaultQuizBlocks[type]),
  };
};
