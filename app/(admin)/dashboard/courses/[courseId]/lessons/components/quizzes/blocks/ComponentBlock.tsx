import { ComponentQuizType } from "@/lib/quizParser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DUMMY_INTERACTIVE_COMPONENTS, QuizValidationErrorMap } from "../types";
import ConfigPanel from "./componentBlock/ConfigPanel";
import TemporaryCommonPanel from "./componentBlock/TemporaryCommonPanel";

type ComponentBlockProps = {
  value: ComponentQuizType;
  errors: QuizValidationErrorMap;
  onChange: (next: ComponentQuizType) => void;
};

const ComponentBlock = ({ value, errors, onChange }: ComponentBlockProps) => {
  const componentDetail = DUMMY_INTERACTIVE_COMPONENTS.find(
    (component) => component.name === value.componentName
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
        <p>{componentDetail ? componentDetail.label : value.componentName}</p>
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
      {componentDetail ? (
        <ConfigPanel
          props={componentDetail.props}
          propValues={value.props}
          onChange={handleComponentConfigChange}
        />
      ) : (
        <TemporaryCommonPanel
          value={value}
          errors={errors}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default ComponentBlock;
