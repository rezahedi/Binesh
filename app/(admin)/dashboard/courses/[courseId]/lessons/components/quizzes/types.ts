import { QuizType } from "@/lib/quizParser";

export type EditableQuizKind =
  | "radio"
  | "checkList"
  | "fill"
  | "pickAndFill"
  | "placement"
  | "sentenceBuilder";

export const EDITABLE_QUIZ_TYPES: EditableQuizKind[] = [
  "radio",
  "checkList",
  "fill",
  "pickAndFill",
  "placement",
  "sentenceBuilder",
];

export const EDITABLE_QUIZ_LABELS: Record<EditableQuizKind, string> = {
  radio: "Radio",
  checkList: "Checklist",
  fill: "Fill",
  pickAndFill: "Pick And Fill",
  placement: "Placement",
  sentenceBuilder: "Sentence Builder",
};

export type QuizValidationErrorMap = Record<string, string>;

export type QuizValidationResult = {
  isValid: boolean;
  errors: QuizValidationErrorMap;
};

export type LessonQuizValidationState = {
  isValid: boolean;
  stepErrors: Record<number, QuizValidationErrorMap>;
  summary: string[];
};

export const isEditableQuizKind = (
  value: QuizType["type"]
): value is EditableQuizKind => {
  return EDITABLE_QUIZ_TYPES.includes(value as EditableQuizKind);
};
