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
    options: ["Madrid", "Berlin"],
    answer: "Madrid",
  },
  checkList: {
    options: ["2", "3", "5", "4"],
    answers: ["2", "4"],
  },
  fill: {
    answer: "France",
    content: "The capital of [France] is Paris.",
  },
  pickAndFill: {
    options: ["France", "Brazil", "California", "Germany", "Ontario"],
    answers: ["France", "Brazil"],
    content:
      "The capital of [ ] is Paris, and the largest city in [ ] is Rio de Janeiro.",
  },
  placement: {
    aspectRatio: "1/1",
    zones: ["1", "2", "3", "4"],
    options: [
      { zone: "4", content: "Cuatro" },
      { zone: "2", content: "Dos" },
      { zone: "1", content: "Uno" },
      { zone: "3", content: "Tres" },
    ],
  },
  sentenceBuilder: {
    options: ["TypeScript", "improves", "code", "safety."],
  },
};

const defaultQuizPrompts: Record<EditableQuizKind, string> = {
  radio: "Which city is the capital of Spain?",
  checkList: "Select all even numbers.",
  fill: "Fill in the blank with the correct name.",
  pickAndFill: "Fill each blank using the correct option.",
  placement: "Place the correct word in each zone.",
  sentenceBuilder: "Arrange the words to build a meaningful sentence.",
};

export const createDefaultQuiz = (type: EditableQuizKind): QuizType => {
  return {
    type,
    content: defaultQuizPrompts[type],
    quizBlock: structuredClone(defaultQuizBlocks[type]),
  };
};
