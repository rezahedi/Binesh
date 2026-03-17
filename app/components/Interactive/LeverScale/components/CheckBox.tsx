const CheckBox = ({
  transform,
  status = null,
}: {
  transform: string;
  status?: boolean | null;
}) => {
  if (status === null) return null;

  return (
    <g transform={transform}>
      <rect
        fill={status ? "lightgreen" : "#ffa1a1"}
        strokeLinecap="round"
        strokeLinejoin="miter"
        x="0"
        y="0"
        width="30"
        height="30"
        rx="8"
        ry="8"
      />
      <text
        x="15"
        y="20"
        dominantBaseline="alphabetic"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="black"
      >
        {status ? "✓" : "✕"}
      </text>
    </g>
  );
};

export default CheckBox;
