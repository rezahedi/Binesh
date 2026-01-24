const ROD_HEIGHT = 10;
const LABELS_WIDTH = 6;

const Rod = ({
  angle,
  width,
  rodLength,
  fulcrum,
  axisWidth,
}: {
  angle: number;
  width: number;
  rodLength: number;
  fulcrum: number;
  axisWidth: number;
}) => {
  const centerX = axisWidth * fulcrum;

  return (
    <g
      transform={`rotate(${angle}, ${centerX}, 0)`}
      className="transition-all duration-500"
    >
      {/* Bar */}
      <rect
        fill="rgba(70.2%,70.2%,70.2%,1)"
        stroke="rgba(0%,0%,0%,0)"
        strokeWidth="2"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        x="0"
        y={-ROD_HEIGHT / 2}
        width={width}
        height={ROD_HEIGHT}
        rx="2"
        ry="2"
      />
      {/* Labels */}
      {Array.from({ length: rodLength }, (_, index) => (
        <rect
          key={index}
          fill="rgba(0%,0%,0%,1)"
          stroke="rgba(0%,0%,0%,0)"
          strokeWidth="2"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          x={index * axisWidth - LABELS_WIDTH / 2}
          y={-ROD_HEIGHT / 2}
          width={LABELS_WIDTH}
          height={ROD_HEIGHT}
          rx="2"
          ry="2"
        />
      ))}
    </g>
  );
};

export default Rod;
