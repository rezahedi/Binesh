import { Label } from "@/components/ui/label";
import {
  LessonDocument,
  SectionType,
  QuizType,
  parseLessonDocument,
  serializeLessonDocument,
} from "@/lib/quizParser";
import { generateRandomString } from "@/utils/string";
import { useEffect, useMemo, useState } from "react";
import LessonBlocksEditor from "./LessonBlocksEditor";
import { validateLessonQuizSteps } from "./quizzes/quizValidation";

type LessonContentEditorProps = {
  content: string;
  onContentChange: (value: string) => void;
};

const LessonContentTab = ({
  content,
  onContentChange,
}: LessonContentEditorProps) => {
  const [document, setDocument] = useState<LessonDocument | null>(() => {
    try {
      return parseLessonDocument(content);
    } catch {
      return null;
    }
  });
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);

  useEffect(() => {
    if (!document) return;
    onContentChange(serializeLessonDocument(document));
  }, [document, onContentChange]);

  const handleStepChange = (
    index: number,
    patch: { title?: string; content?: string; quiz?: QuizType | null }
  ) => {
    setDocument((prev) => {
      if (!prev) return prev;
      const nextSteps = prev.steps.map((step, stepIndex) => {
        if (stepIndex !== index) return step;
        return {
          ...step,
          title: patch.title ?? step.title,
          content: patch.content ?? step.content,
          quiz: patch.quiz !== undefined ? patch.quiz : step.quiz,
        };
      });
      return {
        ...prev,
        steps: nextSteps,
      };
    });
  };

  const cloneStep = (step: SectionType): SectionType => {
    return {
      id: `${generateRandomString()}${Date.now()}`,
      title: step.title ? `${step.title} (Copy)` : "Untitled Step (Copy)",
      content: step.content,
      quiz: step.quiz ? structuredClone(step.quiz) : null,
    };
  };

  const createEmptyStep = (): SectionType => {
    return {
      id: `${generateRandomString()}${Date.now()}`,
      title: "New Step",
      content: "",
      quiz: null,
    };
  };

  const handleAddStepAfter = (index: number) => {
    setDocument((prev) => {
      if (!prev) return prev;
      const nextSteps = [...prev.steps];
      nextSteps.splice(index + 1, 0, createEmptyStep());
      return { ...prev, steps: nextSteps };
    });
    setSelectedStepIndex(index + 1);
  };

  const handleDuplicateStep = (index: number) => {
    setDocument((prev) => {
      if (!prev) return prev;
      const source = prev.steps[index];
      if (!source) return prev;
      const nextSteps = [...prev.steps];
      nextSteps.splice(index + 1, 0, cloneStep(source));
      return { ...prev, steps: nextSteps };
    });
    setSelectedStepIndex(index + 1);
  };

  const handleRemoveStep = (index: number) => {
    setDocument((prev) => {
      if (!prev) return prev;
      const nextSteps = prev.steps.filter((_, i) => i !== index);
      return { ...prev, steps: nextSteps };
    });
    setSelectedStepIndex((prevSelected) => {
      if (prevSelected > index) return prevSelected - 1;
      if (prevSelected === index) return Math.max(0, index - 1);
      return prevSelected;
    });
  };

  const contentForSubmit = useMemo(() => {
    if (document) {
      return serializeLessonDocument(document);
    }
    return content;
  }, [content, document]);

  const validationState = useMemo(() => {
    if (!document) {
      return {
        isValid: true,
        stepErrors: {},
        summary: [] as string[],
      };
    }
    return validateLessonQuizSteps(document.steps);
  }, [document]);

  const clampedSelectedStepIndex = useMemo(() => {
    if (!document || document.steps.length === 0) return 0;
    return Math.min(selectedStepIndex, document.steps.length - 1);
  }, [document, selectedStepIndex]);

  return (
    <div className="space-y-4">
      <Label>Content Editor</Label>

      <input
        name="contentValidation"
        value={validationState.isValid ? "ok" : ""}
        required
        readOnly
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only h-0 w-0 border-0 p-0"
      />
      <input type="hidden" name="content" value={contentForSubmit} required />
      {!validationState.isValid && (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3">
          <p className="text-sm font-medium text-destructive">
            Resolve quiz issues before saving.
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm text-destructive">
            {validationState.summary.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      )}
      <LessonBlocksEditor
        steps={document?.steps || []}
        onStepChange={handleStepChange}
        onAddStepAfter={handleAddStepAfter}
        onDuplicateStep={handleDuplicateStep}
        onRemoveStep={handleRemoveStep}
        stepErrors={validationState.stepErrors}
        selectedStepIndex={clampedSelectedStepIndex}
        onSelectStep={setSelectedStepIndex}
      />
    </div>
  );
};

export default LessonContentTab;
