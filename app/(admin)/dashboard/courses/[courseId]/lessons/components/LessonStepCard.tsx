import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionType } from "@/lib/quizParser";

type LessonStepCardProps = {
  index: number;
  step: SectionType;
  onStepChange: (
    index: number,
    patch: { title?: string; content?: string }
  ) => void;
};

const LessonStepCard = ({ index, step, onStepChange }: LessonStepCardProps) => {
  const quizLabel = step.quiz ? `Has quiz (${step.quiz.type})` : "No quiz";

  return (
    <div className="space-y-3 rounded-md border p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Step {index + 1}</h4>
        <p className="text-xs text-muted-foreground">{quizLabel}</p>
      </div>
      <div>
        <Label htmlFor={`step-title-${step.id}`}>Title</Label>
        <Input
          id={`step-title-${step.id}`}
          value={step.title}
          onChange={(e) => onStepChange(index, { title: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor={`step-content-${step.id}`}>Content</Label>
        <Textarea
          id={`step-content-${step.id}`}
          value={step.content}
          onChange={(e) => onStepChange(index, { content: e.target.value })}
          rows={6}
          className="resize-y"
        />
      </div>
    </div>
  );
};

export default LessonStepCard;
