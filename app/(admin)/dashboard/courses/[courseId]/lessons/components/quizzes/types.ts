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
