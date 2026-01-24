const Lever = ({
  fulcrum,
  axisWidth,
  height,
}: {
  fulcrum: number;
  axisWidth: number;
  height: number;
}) => {
  return (
    <g transform={`translate(${fulcrum * axisWidth}, ${-height + 5})`}>
      <line
        fill="rgba(0%,0%,0%,0)"
        stroke="rgba(0%,0%,0%,1)"
        strokeWidth="3"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        x1="0"
        y1="0"
        x2="0"
        y2={height}
      ></line>
      <circle
        fill="rgba(0%,0%,0%,1)"
        stroke="rgba(0%,0%,0%,0)"
        strokeWidth="2"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        r="5"
        cx="0"
        cy={height}
      ></circle>
    </g>
  );
};

export default Lever;
