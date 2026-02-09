import { LeverScaleProps } from "./LeverScale";
import Weight from "./Weight";

type WeightsProps = {
  angle?: number;
  axisWidth: number;
} & LeverScaleProps;

const Weights = (props: WeightsProps) => {
  const { angle = 0, axisWidth, ...leverScaleProps } = props;
  const { masses, fulcrum, rodLength, isActive, draggableWeightIndex } =
    leverScaleProps;
  const centerX = axisWidth * fulcrum;
  const centerY = 0;

  return (
    <>
      {masses.map(([weight, position], index) => {
        const radius = (angle * Math.PI) / 180;
        const x = centerX + position * axisWidth * Math.cos(radius);
        const y = centerY + position * axisWidth * Math.sin(radius);
        const isDraggable =
          isActive && draggableWeightIndex === index ? true : false;
        return (
          <Weight
            key={index}
            weight={weight}
            position={position}
            range={position > 0 ? rodLength - fulcrum - 1 : -fulcrum}
            x={x}
            y={y}
            color={index % 2 === 0 ? "skyblue" : "lightgreen"}
            isDraggable={isDraggable}
            snapSize={axisWidth}
          />
        );
      })}
    </>
  );
};

export default Weights;
