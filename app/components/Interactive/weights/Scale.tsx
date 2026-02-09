import Lever from "./Lever";
import Rod from "./Rod";
import Weights from "./Weights";

const LEVER_HEIGHT = 60;

type ScaleProps = {
  x?: number;
  y?: number;
  width: number;
  angle?: number;
  rodLength: number;
  masses: number[][];
  fulcrum: number;
  draggableWeightIndex?: number;
  isActive?: boolean;
};

const Scale = ({
  x = 0,
  y = 0,
  width,
  angle = 0,
  rodLength,
  masses,
  fulcrum,
  draggableWeightIndex,
  isActive = false,
}: ScaleProps) => {
  const axisWidth = width / (rodLength - 1);

  return (
    <g transform={`translate(${x}, ${y + LEVER_HEIGHT})`}>
      <Rod
        angle={angle}
        width={width}
        rodLength={rodLength}
        fulcrum={fulcrum}
        axisWidth={axisWidth}
      />
      <Lever
        fulcrum={fulcrum}
        axisWidth={axisWidth}
        height={LEVER_HEIGHT}
        isActive={isActive}
      />
      <Weights
        masses={masses}
        angle={angle}
        fulcrum={fulcrum}
        rodLength={rodLength}
        axisWidth={axisWidth}
        draggableWeightIndex={draggableWeightIndex}
        isActive={isActive}
      />
    </g>
  );
};

export default Scale;
