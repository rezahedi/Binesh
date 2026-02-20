import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  LessonDocument,
  QuizType,
  parseLessonDocument,
  serializeLessonDocument,
} from "@/lib/quizParser";
import { useMemo, useState } from "react";
import LessonBlocksEditor from "./LessonBlocksEditor";
import { validateLessonQuizSteps } from "./quizzes/quizValidation";

export type ContentEditorMode = "raw" | "blocks";

type LessonContentEditorProps = {
  content: string;
  onContentChange: (value: string) => void;
};

const LessonContentEditor = ({
  content,
  onContentChange,
}: LessonContentEditorProps) => {
  const [mode, setMode] = useState<ContentEditorMode>("blocks");
  const [document, setDocument] = useState<LessonDocument | null>(
    parseLessonDocument(content)
  );
  const [parseError, setParseError] = useState<string | null>(null);

  const switchToBlocks = () => {
    try {
      const parsed = parseLessonDocument(content);
      setDocument(parsed);
      setParseError(null);
      setMode("blocks");
    } catch {
      setParseError("Could not parse content. Continue editing in raw mode.");
      setMode("raw");
    }
  };

  const switchToRaw = () => {
    if (document) {
      onContentChange(serializeLessonDocument(document));
    }
    setMode("raw");
  };

  const handleModeChange = (nextMode: ContentEditorMode) => {
    if (nextMode === mode) return;
    if (nextMode === "blocks") {
      switchToBlocks();
      return;
    }
    switchToRaw();
  };

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

  const contentForSubmit = useMemo(() => {
    if (mode === "blocks" && document) {
      return serializeLessonDocument(document);
    }
    return content;
  }, [content, document, mode]);

  const validationState = useMemo(() => {
    if (mode !== "blocks" || !document) {
      return {
        isValid: true,
        stepErrors: {},
        summary: [] as string[],
      };
    }
    return validateLessonQuizSteps(document.steps);
  }, [document, mode]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Content Mode</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={mode === "raw" ? "default" : "outline"}
            size="sm"
            onClick={() => handleModeChange("raw")}
          >
            Raw Markdown
          </Button>
          <Button
            type="button"
            variant={mode === "blocks" ? "default" : "outline"}
            size="sm"
            onClick={() => handleModeChange("blocks")}
          >
            Blocks
          </Button>
        </div>
      </div>

      {parseError && <p className="text-sm text-destructive">{parseError}</p>}

      {mode === "raw" && (
        <div>
          <Label htmlFor="content">Content *:</Label>
          <Textarea
            id="content"
            name="content"
            required
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            rows={15}
            className="resize-y"
          />
        </div>
      )}

      {mode === "blocks" && (
        <>
          <input
            name="contentValidation"
            value={validationState.isValid ? "ok" : ""}
            required
            readOnly
            tabIndex={-1}
            aria-hidden="true"
            className="sr-only h-0 w-0 border-0 p-0"
          />
          <input
            type="hidden"
            name="content"
            value={contentForSubmit}
            required
          />
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
            stepErrors={validationState.stepErrors}
          />
        </>
      )}
    </div>
  );
};

export default LessonContentEditor;
