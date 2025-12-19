import { generateRandomString } from "@/utils/string";
import matter from "gray-matter";

export type SectionType = {
  id: string;
  title: string;
  content: string;
  quiz: QuizType | null;
};

export const parseLesson = (
  markdownContent: string
): { metadata: Record<string, string>; steps: SectionType[] } => {
  const { data: metadata, content } = matter(markdownContent);
  const steps: SectionType[] = parseSections(content);
  return { metadata, steps };
};

export const parseSections = (section: string): SectionType[] => {
  return section
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

export const QUIZ_TYPES = ["radio", "checkList", "fill", "component"] as const;
export type QuizKind = (typeof QUIZ_TYPES)[number];

export type QuizBlock =
  | RadioQuizType
  | CheckListQuizType
  | FillQuizType
  | ComponentQuizType;

export type ComponentQuizType = {
  componentName: string;
  answer: string;
  afterContent: string;
};

const parseQuizComponent = (str: string): QuizType | null => {
  if (!str) return null;

  const regex =
    /([\s\S]*?)<component name="(\w+)" answer="(\w+)" \/>([\s\S]*)/m;
  const match = str.match(regex);
  if (!match) return null;

  let [, content, componentName, answer, afterContent] = match;
  content = content.trim();
  componentName = componentName.trim();
  answer = answer.trim();
  afterContent = afterContent.trim();

  return {
    content,
    type: "component",
    quizBlock: { componentName, answer, afterContent },
  };
};

const parseQuizBlock = (str: string): QuizType | null => {
  if (!str) return null;

  const regex = /([\s\S]*?)```quiz:(\w+)\s*([\s\S]*?)```/m;
  const match = str.match(regex);
  if (!match) return null;

  let [, content, quizType, quizBody] = match;
  content = content.trim();
  quizType = quizType.trim();
  quizBody = quizBody.trim();

  if (!QUIZ_TYPES.includes(quizType as QuizKind)) return null;

  const parser = QUIZ_PARSERS[quizType as QuizKind];
  const quizBlock = parser(quizBody);
  if (!quizBlock) return null;

  return { content, type: quizType as QuizKind, quizBlock };
};

const OPTION_REGEX = /- \[(x| )\] (.+)/g;

const parseListOptions = (quiz: string) => {
  const options: string[] = [];
  const checked: number[] = [];

  let match;
  let index = 0;
  while ((match = OPTION_REGEX.exec(quiz)) !== null) {
    const [, mark, text] = match;
    options.push(text.trim());
    if (mark === "x") checked.push(index);
    index++;
  }

  return { options, checked };
};

export type RadioQuizType = { options: string[]; answer: number };

const parseRadioQuiz = (quiz: string): RadioQuizType | null => {
  const { options, checked } = parseListOptions(quiz);
  if (checked.length !== 1) return null; // must be exactly one correct

  return { options, answer: checked[0] };
};

export type CheckListQuizType = { options: string[]; answer: number[] };

const parseCheckListQuiz = (quiz: string): CheckListQuizType | null => {
  const { options, checked } = parseListOptions(quiz);
  if (checked.length === 0) return null;

  return { options, answer: checked };
};

export type FillQuizType = {
  inputType: string;
  answer: string;
  content: string;
};

const parseFillQuiz = (quiz: string): FillQuizType | null => {
  const regex = /:(\w+):([^\r\n]*)\r?\n(.*\[ ?\].*)/m;
  const match = quiz.match(regex);
  if (!match) return null;

  const [, inputType, answer, content] = match;

  return {
    inputType: inputType.trim(),
    answer: answer.trim(),
    content: content.trim(),
  };
};

const QUIZ_PARSERS: Record<QuizKind, (body: string) => QuizBlock | null> = {
  radio: parseRadioQuiz,
  checkList: parseCheckListQuiz,
  fill: parseFillQuiz,
  component: () => null,
};
