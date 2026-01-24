import { useState } from "react";
import Scale from "./Scale";

const WIDTH = 540;
const HEIGHT = 250;

const LeverScale = ({
  masses = [
    [1, -1],
    [1, 1],
  ],
  rodLength = 3,
  fulcrum = 1,
}: {
  masses?: number[][];
  rodLength?: number;
  fulcrum?: number;
}) => {
  const [angle, setAngle] = useState<number>(0);

  const handleShowResult = () => {
    // find torque and set angle accordingly
    const torque =
      Math.abs(masses[1][0] * masses[1][1]) -
      Math.abs(masses[0][0] * masses[0][1]);

    setAngle(torque > 20 ? 20 : torque < -20 ? -20 : torque);
  };

  const handleReset = () => {
    setAngle(0);
  };

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
      <button onClick={handleShowResult}>Show Result</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default LeverScale;
