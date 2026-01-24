import Weight from "./Weight";

const Weights = ({
  masses,
  angle = 0,
  fulcrum,
  axisWidth,
}: {
  masses: number[][];
  angle?: number;
  fulcrum: number;
  axisWidth: number;
}) => {
  const centerX = axisWidth * fulcrum;
  const centerY = 0;

  return (
    <>
      {masses.map(([weight, position], index) => {
        const radius = (angle * Math.PI) / 180;
        const x = centerX + position * axisWidth * Math.cos(radius);
        const y = centerY + position * axisWidth * Math.sin(radius);
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
