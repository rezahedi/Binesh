import Scale from "./Scale";

const WIDTH = 540;
const HEIGHT = 200;

const LeverScale = ({
  masses = [
    [1, -1],
    [1, 1],
  ],
  rodLength = 3,
}: {
  masses?: number[][];
  rodLength?: number;
}) => {
  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="bg-white rounded-xl">
      <Scale
        x={WIDTH * 0.1}
        width={WIDTH * 0.8}
        angle={0}
        rodLength={rodLength}
        masses={masses}
      />
    </svg>
  );
};

export default LeverScale;
