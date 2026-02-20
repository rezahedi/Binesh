import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlacementQuizType } from "@/lib/quizParser";
import { QuizValidationErrorMap } from "../types";

type PlacementBlockProps = {
  value: PlacementQuizType;
  errors: QuizValidationErrorMap;
  onChange: (next: PlacementQuizType) => void;
};

const joinLines = (items: string[]) => items.join("\n");
const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const optionsToText = (options: PlacementQuizType["options"]) =>
  options.map((option) => `${option.zone}|${option.content}`).join("\n");

const parseOptions = (value: string): PlacementQuizType["options"] => {
  return splitLines(value).map((line) => {
    const [zone = "", ...rest] = line.split("|");
    return { zone: zone.trim(), content: rest.join("|").trim() };
  });
};

const PlacementBlock = ({ value, errors, onChange }: PlacementBlockProps) => {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="placement-aspect-ratio">Aspect Ratio</Label>
        <Input
          id="placement-aspect-ratio"
          value={value.aspectRatio}
          onChange={(e) => onChange({ ...value, aspectRatio: e.target.value })}
        />
        {errors.aspectRatio && (
          <p className="mt-1 text-xs text-destructive">{errors.aspectRatio}</p>
        )}
      </div>
      <div>
        <Label htmlFor="placement-zones">Zones (one per line)</Label>
        <Textarea
          id="placement-zones"
          rows={3}
          value={joinLines(value.zones)}
          onChange={(e) =>
            onChange({ ...value, zones: splitLines(e.target.value) })
          }
        />
        {errors.zones && (
          <p className="mt-1 text-xs text-destructive">{errors.zones}</p>
        )}
      </div>
      <div>
        <Label htmlFor="placement-options">
          Options (zone|content per line)
        </Label>
        <Textarea
          id="placement-options"
          rows={4}
          value={optionsToText(value.options)}
          onChange={(e) =>
            onChange({ ...value, options: parseOptions(e.target.value) })
          }
        />
        <p className="mt-1 text-xs text-muted-foreground">Example: A|Heart</p>
        {errors.options && (
          <p className="mt-1 text-xs text-destructive">{errors.options}</p>
        )}
      </div>
    </div>
  );
};

export default PlacementBlock;
