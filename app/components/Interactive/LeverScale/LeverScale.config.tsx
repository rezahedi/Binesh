import { LeverScaleProps } from "@/components/Interactive/LeverScale";

const LeverScaleConfig = ({
  props,
  onChange,
}: {
  props: LeverScaleProps;
  onChange: (obj: LeverScaleProps) => void;
}) => {
  if (!props) return null;

  return (
    <div>
      <h3>Lever Scale Panel</h3>
      {props.masses.map((m, i) => (
        <div key={i}>
          Masse {i + 1}:
          <input
            defaultValue={m[0]}
            min={0}
            max={10}
            step={1}
            type="range"
          />{" "}
          {m[0]}
          <input
            defaultValue={m[1]}
            min={-Math.floor(props.rodLength / 2)}
            max={Math.floor(props.rodLength / 2)}
            step={1}
            type="number"
          />
        </div>
      ))}
      Fulcrum:{" "}
      <input
        defaultValue={props.fulcrum}
        type="number"
        onChange={(e) =>
          onChange({ ...props, fulcrum: Number(e.currentTarget.value) })
        }
      />
      Rod Length:{" "}
      <input
        defaultValue={props.rodLength}
        type="number"
        onChange={(e) =>
          onChange({ ...props, rodLength: Number(e.currentTarget.value) })
        }
      />
      Draggable Mass Index:{" "}
      <input
        defaultValue={props.draggableWeightIndex}
        type="number"
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
