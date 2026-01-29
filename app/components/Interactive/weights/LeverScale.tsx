import { useEffect, useState } from "react";
import Scale from "./Scale";

const WIDTH = 540;
const HEIGHT = 250;
const MAX_ANGLE = 20;

const LeverScale = ({
  masses = [
    [1, -1],
    [1, 1],
  ],
  rodLength = 3,
  fulcrum = 1,
  showResult = false,
}: {
  masses?: number[][];
  rodLength?: number;
  fulcrum?: number;
  showResult?: boolean;
}) => {
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
    <div>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="bg-white rounded-xl">
        <Scale
          x={WIDTH * 0.1}
          y={30}
          width={WIDTH * 0.8}
          angle={angle}
          rodLength={rodLength}
          masses={masses}
          fulcrum={fulcrum}
        />
      </svg>
    </div>
  );
};

export default LeverScale;
