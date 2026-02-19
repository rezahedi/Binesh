import { generateRandomString } from "@/utils/string";
import matter from "gray-matter";

export type LessonMetadata = Record<string, unknown>;
export type LessonDocument = {
  metadata: LessonMetadata;
  steps: SectionType[];
};

export type SectionType = {
  id: string;
  title: string;
  content: string;
  quiz: QuizType | null;
};

export const parseLessonDocument = (
  markdownContent: string
): LessonDocument => {
  const { data: metadata, content } = matter(markdownContent);
  const steps: SectionType[] = parseSections(content);
  return { metadata: metadata as LessonMetadata, steps };
};

export const parseSections = (section: string): SectionType[] => {
  if (!section) return [];

  return ("\n" + section)
    .split("\n# ")
    .filter((str) => str.trim())
    .map((step, index) => {
      const [contentSection, quizSection] = splitOnce(step, "---");
      const [title, content] = splitOnce(contentSection, "\n");
      return {
        id: generateRandomString() + String(index),
        title: title.trim(),
        content: content.trim(),
        quiz:
          parseQuizBlock(quizSection.trim()) ||
          parseQuizComponent(quizSection.trim()),
      };
    });
};

const splitOnce = (str: string, delimiter: string): [string, string] => {
  const index = str.indexOf(delimiter);
  return index === -1
    ? [str, ""]
    : [str.slice(0, index), str.slice(index + delimiter.length)];
};

export type QuizType = {
  content: string;
  type: QuizKind;
  quizBlock: QuizBlock;
};

export const QUIZ_TYPES = [
  "radio",
  "checkList",
  "fill",
  "pickAndFill",
  "placement",
  "sentenceBuilder",
  "component",
] as const;
export type QuizKind = (typeof QUIZ_TYPES)[number];

export type QuizBlock =
  | RadioQuizType
  | CheckListQuizType
  | FillQuizType
  | PickAndFillQuizType
  | PlacementQuizType
  | SentenceBuilderQuizType
  | ComponentQuizType;

export type ComponentQuizType = {
  componentName: string;
  answer: string;
  props: Record<string, unknown>;
};

export type RadioQuizType = { options: string[]; answer: string };
export type CheckListQuizType = { options: string[]; answers: string[] };
export type FillQuizType = {
  inputType: string;
  answer: string;
  content: string;
};
export type PickAndFillQuizType = {
  answers: string[];
  content: string;
  options: string[];
};
export type PlacementQuizType = {
  aspectRatio: string;
  zones: string[];
  options: { zone: string; content: string }[];
};
export type SentenceBuilderQuizType = {
  options: string[];
};

// ─── Component Quiz Parser (HTML-in-markdown, kept as-is) ────────────

const parseQuizComponent = (str: string): QuizType | null => {
  if (!str) return null;

  const componentRegex = /([\s\S]*?)<component(\b[^>]*)\/>[\s\S]*/m;
  const propsRegex = /([\w-]+)\s*=\s*'([^']*)'/gm;

  const match = str.match(componentRegex);
  if (!match) return null;

  let [, content, propsString] = match;
  content = content.trim();
  propsString = propsString.trim();

  const propsMatches = propsString.matchAll(propsRegex);

  const parsedProps: Record<string, string> = {};
  [...propsMatches].forEach((match) => {
    const name = match[1];
    const value = match[2];
    if (!name) return;
    parsedProps[name] = value;
  });

  const componentName = parsedProps?.name;
  const answer = parsedProps?.answer;
  let props = {};
  try {
    props = JSON.parse(parsedProps?.props || "{}");
  } catch {
    props = {};
  }
  if (!componentName || !answer) return null;

  return {
    content,
    type: "component",
    quizBlock: {
      componentName,
      answer,
      props,
    },
  };
};

// ─── Unified JSON Quiz Parser ────────────────────────────────────────

const parseQuizBlock = (str: string): QuizType | null => {
  if (!str) return null;

  const regex = /([\s\S]*?)```quiz\s*([\s\S]*?)```/m;
  const match = str.match(regex);
  if (!match) return null;

  let [, content, jsonBody] = match;
  content = content.trim();
  jsonBody = jsonBody.trim();

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(jsonBody);
  } catch {
    return null;
  }

  const quizType = parsed.type as string;
  if (!quizType || !QUIZ_TYPES.includes(quizType as QuizKind)) return null;

  // The JSON object (minus the `type` field) IS the QuizBlock
  const quizBlock = { ...parsed };
  delete quizBlock.type;

  return {
    content,
    type: quizType as QuizKind,
    quizBlock: quizBlock as QuizBlock,
  };
};
