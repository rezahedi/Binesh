import {
  CheckListQuizType,
  FillQuizType,
  PickAndFillQuizType,
  PlacementQuizType,
  QuizType,
  RadioQuizType,
  SectionType,
  SentenceBuilderQuizType,
} from "@/lib/quizParser";
import {
  LessonQuizValidationState,
  QuizValidationErrorMap,
  QuizValidationResult,
} from "./types";

const listFromText = (items: string[]): string[] =>
  items.map((item) => item.trim()).filter(Boolean);

const hasDuplicates = (items: string[]): boolean => {
  return new Set(items).size !== items.length;
};

const countBlanks = (value: string): number => {
  const matches = value.match(/\[\s*\]/g);
  return matches?.length || 0;
};

const validateRadio = (
  quizBlock: RadioQuizType,
  errors: QuizValidationErrorMap
) => {
  const options = listFromText(quizBlock.options);
  if (options.length < 2) {
    errors.options = "Radio quiz needs at least 2 options.";
  } else if (hasDuplicates(options)) {
    errors.options = "Options must be unique.";
  }

  if (!quizBlock.answer.trim()) {
    errors.answer = "Answer is required.";
  } else if (!options.includes(quizBlock.answer.trim())) {
    errors.answer = "Answer must match one of the options.";
  }
};

const validateCheckList = (
  quizBlock: CheckListQuizType,
  errors: QuizValidationErrorMap
) => {
  const options = listFromText(quizBlock.options);
  const answers = listFromText(quizBlock.answers);

  if (options.length < 2) {
    errors.options = "Checklist quiz needs at least 2 options.";
  } else if (hasDuplicates(options)) {
    errors.options = "Options must be unique.";
  }

  if (answers.length === 0) {
    errors.answers = "At least one correct answer is required.";
  } else if (hasDuplicates(answers)) {
    errors.answers = "Correct answers must be unique.";
  } else if (!answers.every((answer) => options.includes(answer))) {
    errors.answers = "Each correct answer must exist in options.";
  }
};

const validateFill = (
  quizBlock: FillQuizType,
  errors: QuizValidationErrorMap
) => {
  if (!quizBlock.answer.trim()) {
    errors.answer = "Answer is required.";
  }
  if (!/\[.*\]/.test(quizBlock.content)) {
    errors.content = "Fill content must include one [ ] blank.";
  }
};

const validatePickAndFill = (
  quizBlock: PickAndFillQuizType,
  errors: QuizValidationErrorMap
) => {
  const options = listFromText(quizBlock.options);
  const answers = listFromText(quizBlock.answers);

  if (options.length < 2) {
    errors.options = "Pick and fill quiz needs at least 2 options.";
  } else if (hasDuplicates(options)) {
    errors.options = "Options must be unique.";
  }

  if (answers.length < 1) {
    errors.answers = "At least one answer is required.";
  } else if (hasDuplicates(answers)) {
    errors.answers = "Answers must be unique.";
  } else if (!answers.every((answer) => options.includes(answer))) {
    errors.answers = "Each answer must exist in options.";
  }

  const blanksCount = countBlanks(quizBlock.content);
  if (blanksCount !== answers.length) {
    errors.content = "Blank count in content must match answers count.";
  }
};

const validatePlacement = (
  quizBlock: PlacementQuizType,
  errors: QuizValidationErrorMap
) => {
  const zones = listFromText(quizBlock.zones);
  const options = quizBlock.options.map((option) => ({
    zone: option.zone.trim(),
    content: option.content.trim(),
  }));
  const optionZones = options.map((option) => option.zone);

  if (zones.length < 2) {
    errors.zones = "Placement quiz needs at least 2 zones.";
  } else if (hasDuplicates(zones)) {
    errors.zones = "Zones must be unique.";
  }

  if (!quizBlock.aspectRatio.trim()) {
    errors.aspectRatio = "Aspect ratio is required.";
  }

  if (options.length !== zones.length) {
    errors.placementOptions = "Options count must match zones count.";
    return;
  }

  if (options.some((option) => !option.content)) {
    errors.placementOptions = "Each option must have content.";
    return;
  }

  if (!optionZones.every((zone) => zones.includes(zone))) {
    errors.placementOptions = "Each option zone must exist in zones.";
    return;
  }

  if (new Set(optionZones).size !== zones.length) {
    errors.placementOptions = "Each zone must be mapped exactly once.";
  }
};

const validateSentenceBuilder = (
  quizBlock: SentenceBuilderQuizType,
  errors: QuizValidationErrorMap
) => {
  const options = listFromText(quizBlock.options);
  if (options.length < 2) {
    errors.options = "Sentence builder needs at least 2 options.";
  } else if (hasDuplicates(options)) {
    errors.options = "Options must be unique.";
  }
};

export const validateQuiz = (quiz: QuizType): QuizValidationResult => {
  const errors: QuizValidationErrorMap = {};

  if (quiz.type === "component") {
    return { isValid: true, errors };
  }

  if (quiz.type === "radio") {
    validateRadio(quiz.quizBlock as RadioQuizType, errors);
  } else if (quiz.type === "checkList") {
    validateCheckList(quiz.quizBlock as CheckListQuizType, errors);
  } else if (quiz.type === "fill") {
    validateFill(quiz.quizBlock as FillQuizType, errors);
  } else if (quiz.type === "pickAndFill") {
    validatePickAndFill(quiz.quizBlock as PickAndFillQuizType, errors);
  } else if (quiz.type === "placement") {
    validatePlacement(quiz.quizBlock as PlacementQuizType, errors);
  } else if (quiz.type === "sentenceBuilder") {
    validateSentenceBuilder(quiz.quizBlock as SentenceBuilderQuizType, errors);
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateLessonQuizSteps = (
  steps: SectionType[]
): LessonQuizValidationState => {
  const stepErrors: Record<number, QuizValidationErrorMap> = {};
  const summary: string[] = [];

  steps.forEach((step, index) => {
    if (!step.quiz) return;
    const validation = validateQuiz(step.quiz);
    if (validation.isValid) return;
    stepErrors[index] = validation.errors;
    summary.push(`Step ${index + 1} (${step.quiz.type}) has invalid fields.`);
  });

  return {
    isValid: summary.length === 0,
    stepErrors,
    summary,
  };
};
