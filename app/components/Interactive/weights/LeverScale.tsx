import { cn } from "@/utils/cn";
import Scale from "./Scale";

const WIDTH = 540;
const HEIGHT = 250;
const MAX_ANGLE = 20;

export type LeverScaleProps = {
  masses: [number, number][];
  draggableWeightIndex?: number;
  rodLength: number;
  fulcrum: number;
  showResult: boolean;
  isActive: boolean;
};

const LeverScale = (props: LeverScaleProps) => {
  const { masses, showResult, isActive } = props;

  let angle = 0;

  if (showResult) {
    const weightDiff =
      Math.abs(masses[1][0] * masses[1][1]) -
      Math.abs(masses[0][0] * masses[0][1]);

    angle =
      weightDiff > MAX_ANGLE
        ? MAX_ANGLE
        : weightDiff < -MAX_ANGLE
          ? -MAX_ANGLE
          : weightDiff;
  }

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={cn("bg-white rounded-xl", !isActive && "pointer-events-none")}
    >
      <Scale
        x={WIDTH * 0.1}
        y={30}
        width={WIDTH * 0.8}
        angle={angle}
        {...props}
      />
    </svg>
  );
};

export default LeverScale;
