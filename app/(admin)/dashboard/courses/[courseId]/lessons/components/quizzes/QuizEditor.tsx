import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { QuizType } from "@/lib/quizParser";
import { useState } from "react";
import QuizEditorFields from "./QuizEditorFields";
import QuizTypeSelect from "./QuizTypeSelect";
import { createDefaultQuiz } from "./quizDefaults";
import { EditableQuizKind, QuizValidationErrorMap } from "./types";
import { TrashIcon } from "lucide-react";
import TextareaBlock from "../block/TextareaBlock";

type QuizEditorProps = {
  id: string;
  quiz: QuizType | null;
  onChange: (nextQuiz: QuizType | null) => void;
  errors: QuizValidationErrorMap;
};

const QuizEditor = ({ id, quiz, onChange, errors }: QuizEditorProps) => {
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

  return (
    <div className="group/quiz space-y-4 rounded-xl my-4 p-4 bg-muted/50">
      <h5 className="-translate-y-6 -m-4 -ml-2 text-sm font-medium text-muted capitalize group-hover/quiz:text-muted-foreground">
        {quiz.type} quiz
      </h5>
      <div className="flex items-center justify-end group-hover/quiz:opacity-100 opacity-0 transition-opacity mt-2">
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
      <TextareaBlock
        id={`quiz-content-${id}`}
        label="Quiz Prompt"
        value={quiz.content}
        onChange={(e) => onChange({ ...quiz, content: e.target.value })}
      />
      <QuizEditorFields
        quiz={quiz}
        errors={errors}
        onQuizBlockChange={(quizBlock) => onChange({ ...quiz, quizBlock })}
      />
    </div>
  );
};

export default QuizEditor;
