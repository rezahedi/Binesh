import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QuizType } from "@/lib/quizParser";
import { useState } from "react";
import QuizEditorFields from "./QuizEditorFields";
import QuizTypeSelect from "./QuizTypeSelect";
import { createDefaultQuiz } from "./quizDefaults";
import { EditableQuizKind, QuizValidationErrorMap } from "./types";

type QuizEditorProps = {
  quiz: QuizType | null;
  onChange: (nextQuiz: QuizType | null) => void;
  errors: QuizValidationErrorMap;
};

const QuizEditor = ({ quiz, onChange, errors }: QuizEditorProps) => {
  const [nextType, setNextType] = useState<EditableQuizKind>("radio");

  if (!quiz) {
    return (
      <div className="space-y-2 rounded-md border border-dashed p-3">
        <Label>Add quiz</Label>
        <div className="flex items-end gap-2">
          <div className="grow">
            <QuizTypeSelect value={nextType} onChange={setNextType} />
          </div>
          <Button
            type="button"
            size="sm"
            onClick={() => onChange(createDefaultQuiz(nextType))}
          >
            Add quiz
          </Button>
        </div>
      </div>
    );
  }

  if (quiz.type === "component") {
    return (
      <div className="space-y-1 rounded-md border border-dashed p-3">
        <Label>Quiz</Label>
        <p className="text-sm text-muted-foreground">
          Component quiz (read-only for now).
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-md border p-3">
      <div className="flex items-center justify-between">
        <Label>Quiz ({quiz.type})</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange(null)}
        >
          Remove quiz
        </Button>
      </div>
      <div>
        <Label htmlFor="quiz-content">Quiz Prompt (optional)</Label>
        <Textarea
          id="quiz-content"
          rows={3}
          value={quiz.content}
          onChange={(e) => onChange({ ...quiz, content: e.target.value })}
        />
        {errors.content && (
          <p className="mt-1 text-xs text-destructive">{errors.content}</p>
        )}
      </div>
      <QuizEditorFields
        quiz={quiz}
        errors={errors}
        onQuizBlockChange={(quizBlock) => onChange({ ...quiz, quizBlock })}
      />
    </div>
  );
};

export default QuizEditor;
