import { LeverScaleProps } from "@/components/Interactive/LeverScale";
import { Input } from "@/components/ui/input";

const LeverScaleConfig = ({
  props,
  onChange,
}: {
  props: LeverScaleProps;
  onChange: (obj: LeverScaleProps) => void;
}) => {
  if (!props) return null;

  const onMassWeightChange = (index: number, value: number) => {
    onChange({
      ...props,
      masses: props.masses.map((m, i) => (i === index ? [value, m[1]] : m)),
    });
  };

  const onMassPositionChange = (index: number, value: number) => {
    onChange({
      ...props,
      masses: props.masses.map((m, i) => (i === index ? [m[0], value] : m)),
    });
  };

  return (
    <div>
      <h3>Lever Scale Panel</h3>
      <div className="flex gap-2">
        {props.masses.map((m, i) => (
          <div key={i}>
            Masse {i + 1}:
            <Input
              defaultValue={m[0]}
              min={0}
              max={100}
              step={5}
              type="number"
              onChange={(e) =>
                onMassWeightChange(i, Number(e.currentTarget.value))
              }
            />
            <Input
              defaultValue={m[1]}
              min={-props.fulcrum}
              max={props.rodLength - props.fulcrum - 1}
              step={1}
              type="range"
              onChange={(e) =>
                onMassPositionChange(i, Number(e.currentTarget.value))
              }
            />
          </div>
        ))}
      </div>
      Fulcrum:{" "}
      <Input
        defaultValue={props.fulcrum}
        min={1}
        max={props.rodLength - 2}
        step={1}
        type="number"
        onChange={(e) =>
          onChange({ ...props, fulcrum: Number(e.currentTarget.value) })
        }
      />
      Rod Length:{" "}
      <Input
        defaultValue={props.rodLength}
        type="number"
        onChange={(e) =>
          onChange({ ...props, rodLength: Number(e.currentTarget.value) })
        }
      />
      Draggable Mass Index:{" "}
      <Input
        defaultValue={props.draggableWeightIndex}
        type="number"
        min={-1}
        max={props.masses.length - 1}
        step={1}
        onChange={(e) =>
          onChange({
            ...props,
            draggableWeightIndex: Number(e.currentTarget.value),
          })
        }
      />
    </div>
  );
};

export default LeverScaleConfig;
