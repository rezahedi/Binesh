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
      transform={`rotate(${angle}, ${centerX}, 5)`}
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
        y="0"
        width={width}
        height="10"
        rx="2"
        ry="2"
      />
      {/* Labels */}
      {Array.from({ length: rodLength }, (_, index) => (
        <g key={index} transform={`translate(${index * axisWidth}, 0)`}>
          <rect
            fill="rgba(0%,0%,0%,1)"
            stroke="rgba(0%,0%,0%,0)"
            strokeWidth="2"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            x="-3"
            y="0"
            width="6"
            height="10"
            rx="2"
            ry="2"
          />
        </g>
      ))}
    </g>
  );
};

export default Rod;
