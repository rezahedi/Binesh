import { LeverScaleProps } from "@/components/Interactive/LeverScale";

const LeverScaleConfig = ({
  obj,
  onChange,
}: {
  obj: LeverScaleProps;
  onChange: (obj: LeverScaleProps) => void;
}) => {
  return (
    <div>
      <h3>Lever Scale Panel</h3>
      Masses:
      {obj.masses.map((m, i) => (
        <div key={i}>
          <input defaultValue={m[0]} type="range" />
          <input defaultValue={m[1]} type="number" />
        </div>
      ))}
      <input defaultValue={obj.fulcrum} type="number" />
      <input defaultValue={obj.rodLength} type="number" />
      <input defaultValue={obj.draggableWeightIndex} type="number" />
    </div>
  );
};

export default LeverScaleConfig;
