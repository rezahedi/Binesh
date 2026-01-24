import Weight from "./Weight";

const Weights = ({
  masses,
  angle = 0,
  width,
  rodLength,
}: {
  masses: number[][];
  angle?: number;
  width: number;
  rodLength: number;
}) => {
  const axisMargin = width / (rodLength - 1);
  const centerX = width / 2;
  const centerY = 5;

  return (
    <>
      {masses.map(([weight, position], index) => {
        const radius = (angle * Math.PI) / 180;
        const x = centerX + position * axisMargin * Math.cos(radius);
        const y = centerY + position * axisMargin * Math.sin(radius);
        return (
          <Weight
            key={index}
            weight={weight}
            x={x}
            y={y}
            color={index % 2 === 0 ? "skyblue" : "lightgreen"}
          />
        );
      })}
    </>
  );
};

export default Weights;
