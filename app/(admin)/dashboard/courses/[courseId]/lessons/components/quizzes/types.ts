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

export type PropsType = Record<string, { type: string; default: unknown }>;

export type InteractiveComponentItem = {
  name: string;
  label: string;
  icon: LucideIcon;
  props?: PropsType;
};

export const DUMMY_INTERACTIVE_COMPONENTS: InteractiveComponentItem[] = [
  {
    name: "Fraction",
    label: "Fraction",
    icon: ShapesIcon,
  },
  {
    name: "SquareFractionQuiz",
    label: "Square Fraction",
    icon: SlidersHorizontalIcon,
    props: {
      coordinate: { type: "string", default: [1, 1] },
      points: { type: "string", default: [[1, 1]] },
    },
  },
  {
    name: "LeverScale",
    label: "Lever Scale",
    icon: BlocksIcon,
    props: {
      masses: {
        type: "string",
        default: [
          [10, -1],
          [10, 1],
        ],
      },
      draggableWeightIndex: { type: "number", default: 0 },
      rodLength: { type: "number", default: 5 },
      fulcrum: { type: "number", default: 2 },
    },
  },
];

export const getDefaultValueForComponent = (componentName: string) => {
  const componentDetail = DUMMY_INTERACTIVE_COMPONENTS.find(
    (component) => component.name === componentName
  );
  if (!componentDetail || !componentDetail.props) return {};

  const keys = Object.keys(componentDetail.props);
  const defaultValues: Record<string, unknown> = {};

  for (const key of keys) {
    defaultValues[key] = componentDetail.props[key].default;
  }

  return defaultValues;
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
