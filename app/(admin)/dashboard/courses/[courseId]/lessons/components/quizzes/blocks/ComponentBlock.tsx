import { ComponentQuizType } from "@/lib/quizParser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { QuizValidationErrorMap } from "../types";

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
  const [propsText, setPropsText] = useState(nextPropsText);

  useEffect(() => {
    setPropsText(nextPropsText);
  }, [nextPropsText]);

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="component-quiz-name">Component Name</Label>
        <Input
          id="component-quiz-name"
          type="text"
          value={value.componentName}
          onChange={(e) =>
            onChange({
              ...value,
              componentName: e.target.value,
            })
          }
        />
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
        <Label htmlFor="component-quiz-props">Props (JSON)</Label>
        <Input
          id="component-quiz-props"
          type="text"
          value={propsText}
          onChange={(e) => setPropsText(e.target.value)}
          onBlur={() => {
            try {
              const parsed = JSON.parse(propsText) as Record<string, unknown>;
              onChange({
                ...value,
                props: parsed && typeof parsed === "object" ? parsed : {},
              });
            } catch {
              onChange({
                ...value,
                props: {},
              });
            }
          }}
        />
        {errors.props && (
          <p className="mt-1 text-xs text-destructive">{errors.props}</p>
        )}
      </div>
    </div>
  );
};

export default ComponentBlock;
