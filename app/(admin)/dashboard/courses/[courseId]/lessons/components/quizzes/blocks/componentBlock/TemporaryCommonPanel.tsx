import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentQuizType } from "@/lib/quizParser";
import { useState } from "react";
import { QuizValidationErrorMap } from "../../types";

// TODO: This is a temporary component that make the 'props' object editable in a text input

type TemporaryCommonPanelProps = {
  value: ComponentQuizType;
  errors: QuizValidationErrorMap;
  onChange: (next: ComponentQuizType) => void;
};

const TemporaryCommonPanel = ({
  value,
  errors,
  onChange,
}: TemporaryCommonPanelProps) => {
  const nextPropsText =
    typeof value.props === "object" && value.props !== null
      ? JSON.stringify(value.props)
      : "{}";
  const [error, setError] = useState<string | null>(null);

  const handlePropsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const parsed = JSON.parse(e.target.value) as Record<string, unknown>;
      onChange({
        ...value,
        props: parsed && typeof parsed === "object" ? parsed : {},
      });
    } catch {
      // TODO: This error handling is temporary and should change later.
      setError("Invalid JSON");
    }
  };

  return (
    <div>
      <Label htmlFor="component-quiz-props">Props (JSON)</Label>
      <Input
        id="component-quiz-props"
        type="text"
        value={nextPropsText}
        onChange={handlePropsChange}
      />
      {errors.props && (
        <p className="mt-1 text-xs text-destructive">{errors.props}</p>
      )}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default TemporaryCommonPanel;
