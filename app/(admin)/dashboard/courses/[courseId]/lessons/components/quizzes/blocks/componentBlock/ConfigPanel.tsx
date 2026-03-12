import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ConfigPanel = ({
  props,
  propValues,
  onChange,
}: {
  props?: Record<string, string>;
  propValues?: Record<string, unknown>;
  onChange?: (next: Record<string, unknown>) => void;
}) => {
  if (!props) return null;

  const keys = Object.keys(props);

  return (
    <div className="flex flex-col gap-1">
      Component Properties:
      {keys.map((key) => (
        <Label key={key}>
          {key}
          <Input
            type={props[key]}
            name={key}
            placeholder={key}
            defaultValue={JSON.stringify(propValues?.[key])}
            onChange={(e) =>
              onChange?.({
                ...propValues,
                [key]: JSON.parse(e.target.value),
              })
            }
          />
        </Label>
      ))}
    </div>
  );
};

export default ConfigPanel;
