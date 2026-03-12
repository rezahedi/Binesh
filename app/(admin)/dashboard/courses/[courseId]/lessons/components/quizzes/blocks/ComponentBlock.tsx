import { ComponentQuizType } from "@/lib/quizParser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DUMMY_INTERACTIVE_COMPONENTS, QuizValidationErrorMap } from "../types";
import { useState } from "react";
import ConfigPanel from "./componentBlock/ConfigPanel";

type ComponentBlockProps = {
  value: ComponentQuizType;
  errors: QuizValidationErrorMap;
  onChange: (next: ComponentQuizType) => void;
};

const ComponentBlock = ({ value, errors, onChange }: ComponentBlockProps) => {
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

  const componentDetail = DUMMY_INTERACTIVE_COMPONENTS.find(
    (component) => component.name === value.componentName
  );

  if (!componentDetail)
    return (
      <div className="text-destructive">
        &apos;{value.componentName}&apos; Component not found!
      </div>
    );

  const handleComponentConfigChange = (next: Record<string, unknown>) => {
    onChange({
      ...value,
      props: next,
    });
  };

  return (
    <div className="space-y-3">
      <div>
        <p>{componentDetail.label}</p>
        {errors.componentName && (
          <p className="mt-1 text-xs text-destructive">
            {errors.componentName}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="component-quiz-answer">Answer</Label>
        <Input
          id="component-quiz-answer"
          type="text"
          value={value.answer}
          onChange={(e) =>
            onChange({
              ...value,
              answer: e.target.value,
            })
          }
        />
        {errors.answer && (
          <p className="mt-1 text-xs text-destructive">{errors.answer}</p>
        )}
      </div>
      <div>
        <ConfigPanel
          props={componentDetail.props}
          propValues={value.props}
          onChange={handleComponentConfigChange}
        />
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
    </div>
  );
};

export default ComponentBlock;
