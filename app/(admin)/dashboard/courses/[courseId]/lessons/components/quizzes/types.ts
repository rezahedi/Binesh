import { QuizType } from "@/lib/quizParser";
import {
  ArrowUpDownIcon,
  CheckSquareIcon,
  CircleCheckBigIcon,
  ListChecksIcon,
  LucideIcon,
  PuzzleIcon,
  TextCursorInputIcon,
  WholeWordIcon,
  ShapesIcon,
  SlidersHorizontalIcon,
  BlocksIcon,
} from "lucide-react";

export type EditableQuizKind =
  | "radio"
  | "checkList"
  | "fill"
  | "pickAndFill"
  | "placement"
  | "sentenceBuilder"
  | "component";

export const EDITABLE_QUIZ_TYPES: EditableQuizKind[] = [
  "radio",
  "checkList",
  "fill",
  "pickAndFill",
  "placement",
  "sentenceBuilder",
  "component",
];

export const EDITABLE_QUIZ: Record<
  EditableQuizKind,
  { label: string; icon: LucideIcon }
> = {
  radio: { label: "Single Choice", icon: CircleCheckBigIcon },
  checkList: { label: "Multi Choice", icon: CheckSquareIcon },
  fill: { label: "Fill Blank", icon: TextCursorInputIcon },
  pickAndFill: { label: "Word Bank", icon: ListChecksIcon },
  placement: { label: "Cards Ordering", icon: ArrowUpDownIcon },
  sentenceBuilder: { label: "Sentence Building", icon: WholeWordIcon },
  component: { label: "Interactive Component", icon: PuzzleIcon },
};

export const ADDABLE_QUIZ_TYPES = EDITABLE_QUIZ_TYPES.filter(
  (type) => type !== "component"
);

export type InteractiveComponentItem = {
  name: string;
  label: string;
  icon: LucideIcon;
};

export const DUMMY_INTERACTIVE_COMPONENTS: InteractiveComponentItem[] = [
  {
    name: "word-matcher",
    label: "Word Matcher",
    icon: ShapesIcon,
  },
  {
    name: "timeline-sort",
    label: "Timeline Sort",
    icon: SlidersHorizontalIcon,
  },
  {
    name: "block-sequence",
    label: "Block Sequence",
    icon: BlocksIcon,
  },
];

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
