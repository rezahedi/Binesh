import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropsType } from "../../types";

const ConfigPanel = ({
  props,
  propValues,
  onChange,
}: {
  props?: PropsType;
  propValues?: Record<string, unknown>;
  onChange?: (next: Record<string, unknown>) => void;
}) => {
  if (!props) return null;

  const keys = Object.keys(props);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    const key = e.target.name;

    onChange({
      ...propValues,
      [key]: JSON.parse(e.target.value),
    });
  };

  return (
    <div className="flex flex-col gap-1">
      Component Properties:
      {keys.map((key) => (
        <Label key={key}>
          {key}
          <Input
            type={props[key].type}
            name={key}
            placeholder={key}
            defaultValue={JSON.stringify(propValues?.[key])}
            onChange={handleChange}
          />
        </Label>
      ))}
    </div>
  );
};

export default ConfigPanel;
