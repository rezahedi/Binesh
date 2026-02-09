import Lever from "./Lever";
import { LeverScaleProps } from "./LeverScale";
import Rod from "./Rod";
import Weights from "./Weights";

const LEVER_HEIGHT = 60;

type ScaleProps = {
  x?: number;
  y?: number;
  width: number;
  angle?: number;
} & LeverScaleProps;

const Scale = (props: ScaleProps) => {
  const { x = 0, y = 0, width, angle = 0, ...leverScaleProps } = props;
  const axisWidth = width / (leverScaleProps.rodLength - 1);

  return (
    <g transform={`translate(${x}, ${y + LEVER_HEIGHT})`}>
      <Rod
        angle={angle}
        width={width}
        axisWidth={axisWidth}
        {...leverScaleProps}
      />
      <Lever axisWidth={axisWidth} height={LEVER_HEIGHT} {...leverScaleProps} />
      <Weights angle={angle} axisWidth={axisWidth} {...leverScaleProps} />
    </g>
  );
};

export default Scale;
