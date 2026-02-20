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
            type="hidden"
            name="content"
            value={contentForSubmit}
            required
          />
          <LessonBlocksEditor
            steps={document?.steps || []}
            onStepChange={handleStepChange}
          />
        </>
      )}
    </div>
  );
};

export default LessonContentEditor;
