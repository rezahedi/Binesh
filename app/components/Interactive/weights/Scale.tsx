import Fulcrum from "./Fulcrum";
import Rod from "./Rod";
import Weights from "./Weights";

const FULCRUM_HEIGHT = 60;

const Scale = ({
  x = 0,
  y = 0,
  width,
  angle = 0,
  rodLength = 5,
  masses = [
    [10, -3],
    [20, 3],
  ],
}: {
  x?: number;
  y?: number;
  width: number;
  angle: number;
  rodLength: number;
  masses?: number[][];
}) => {
  return (
    <g transform={`translate(${x}, ${y + FULCRUM_HEIGHT})`}>
      <Rod angle={angle} width={width} rodLength={rodLength} />
      <Fulcrum x={width / 2} height={FULCRUM_HEIGHT} />
      <Weights
        masses={masses}
        angle={angle}
        width={width}
        rodLength={rodLength}
      />
    </g>
  );
};

export default Scale;
