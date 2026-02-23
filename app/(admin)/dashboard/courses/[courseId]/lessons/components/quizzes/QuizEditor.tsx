import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QuizType } from "@/lib/quizParser";
import { useState } from "react";
import QuizEditorFields from "./QuizEditorFields";
import QuizTypeSelect from "./QuizTypeSelect";
import { createDefaultQuiz } from "./quizDefaults";
import { EditableQuizKind, QuizValidationErrorMap } from "./types";
import { TrashIcon } from "lucide-react";

type QuizEditorProps = {
  quiz: QuizType | null;
  onChange: (nextQuiz: QuizType | null) => void;
  errors: QuizValidationErrorMap;
};

const QuizEditor = ({ quiz, onChange, errors }: QuizEditorProps) => {
  const [nextType, setNextType] = useState<EditableQuizKind>("radio");

  if (!quiz) {
    return (
      <div className="space-y-4 rounded-xl my-4 p-6 bg-muted/50">
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
      <div className="space-y-4 rounded-xl my-4 p-6 bg-muted/50">
        <Label>Quiz</Label>
        <p className="text-sm text-muted-foreground">
          Component quiz (read-only for now).
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl my-4 p-6 bg-muted/50">
      <div className="flex items-center justify-between">
        <Label className="text-muted-foreground">Quiz ({quiz.type})</Label>
        <Button
          type="button"
          variant="link"
          size="icon"
          className="text-muted-foreground hover:text-destructive hover:bg-muted"
          title="Remove quiz"
          onClick={() => onChange(null)}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="group/quiz relative">
        <label
          htmlFor="quiz-content"
          className="opacity-0 group-hover/quiz:opacity-100 absolute top-0 right-0 px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted"
        >
          Quiz Prompt
        </label>
        <Textarea
          id="quiz-content"
          value={quiz.content}
          onChange={(e) => onChange({ ...quiz, content: e.target.value })}
          className="field-sizing-content bg-transparent border-none hover:bg-muted resize-none min-h-14"
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
