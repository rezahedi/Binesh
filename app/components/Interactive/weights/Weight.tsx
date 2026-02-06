import { useQuiz } from "@/contexts/QuizContext";
import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

const ROPE_LENGTH = 40;

function getSvgPoint(svg: SVGSVGElement, clientX: number, clientY: number) {
  if (!svg) return;

  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  return pt.matrixTransform(svg.getScreenCTM()?.inverse());
}

const Weight = ({
  weight,
  x,
  y,
  color,
  isDraggable = false,
  snapSize = 1,
}: {
  weight: number;
  x: number;
  y: number;
  color: string;
  isDraggable?: boolean;
  snapSize?: number;
}) => {
  console.log("weight", weight, isDraggable);
  const scale = 1 + Math.abs(weight) / 100;
  const [translate, setTranslate] = useState<{
    x: number;
    y: number;
  }>({
    x,
    y,
  });
  const [dragging, setDragging] = useState<boolean>(false);
  const dragXOffset = useRef<number>(0);
  const { userAnswer, setUserAnswer } = useQuiz();

  useEffect(() => {
    setTranslate({
      x,
      y,
    });
  }, [x, y]);

  const snap = (v: number) =>
    snapSize > 1 ? Math.round(v / snapSize) * snapSize : v;

  const handleDragStart = (e: React.PointerEvent<SVGGElement>) => {
    if (!isDraggable) return;

    const svg = (e.currentTarget as SVGGraphicsElement).ownerSVGElement;
    if (!svg) return;

    const point = getSvgPoint(svg, e.clientX, e.clientY);
    if (!point) return;

    dragXOffset.current = point.x - translate.x;

    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const handleDragMove = (e: React.PointerEvent<SVGGElement>) => {
    if (!isDraggable) return;

    const svgElement = (e.currentTarget as SVGGraphicsElement).ownerSVGElement;
    if (!dragging || !svgElement) return;

    const point = getSvgPoint(svgElement, e.clientX, e.clientY);
    if (!point) return;

    const newX = snap(point.x - dragXOffset.current);
    setTranslate((prev) => ({
      ...prev,
      x: newX,
    }));
    const dragDirection = point.x - dragXOffset.current - newX > 0 ? 1 : -1;
    if (translate.x !== newX) {
      console.log("dir", dragDirection);
      const n = userAnswer ? Number(userAnswer) : -2;
      console.log("userAnswer", n, "setUserAnswer", String(n - dragDirection));
      setUserAnswer(String(n - dragDirection));
    }
  };

  const handleDragEnd = (e: React.PointerEvent<SVGGElement>) => {
    if (!isDraggable) return;

    if (e) e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
  };

  return (
    <g
      transform={`translate(${translate.x}, ${translate.y})`}
      className={cn(
        "group select-none touch-none transition duration-500",
        isDraggable &&
          (dragging ? "cursor-grabbing duration-100" : "cursor-grab")
      )}
      onPointerDown={handleDragStart}
      onPointerMove={handleDragMove}
      onPointerUp={handleDragEnd}
      onPointerCancel={handleDragEnd}
      fill="transparent"
    >
      <line
        fill="rgba(0%,0%,0%,0)"
        stroke="rgba(0%,0%,0%,1)"
        strokeWidth="3"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        x1="0"
        y1="0"
        x2="0"
        y2={ROPE_LENGTH}
      ></line>
      {isDraggable && (
        <circle
          fill="white"
          strokeWidth="5"
          r="12"
          cx="0"
          cy="0"
          className={cn(
            "stroke-secondary animate-zoom-pulse group-hover:animate-none drop-shadow-[0_0_10px_rgba(0,0,0,1)]",
            dragging && "scale-95"
          )}
        ></circle>
      )}
      <g
        transform={`translate(0, ${ROPE_LENGTH}), scale(${scale})`}
        className="transition duration-500"
      >
        <polygon
          fill={color}
          stroke="rgba(84.31%,65.1%,7.45%,1)"
          strokeWidth="2"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          transform="rotate(180)"
          points="-3.3065463576978533e-15, -56 -4.0053768112136625, -55.54870241927283 -7.809907304116049, -54.217439622243546 -11.222816433457206, -52.072966684424536 -14.07296668442454, -49.2228164334572 -16.217439622243546, -45.809907304116045 -17.548702419272825, -42.00537681121366 -18, -38 -18, -26 -18, -25.999999999999996 -17.714207691800055, -22.805184535568344 -16.865906016469815, -19.711819480675885 -15.482032539991774, -16.8181337174496 -13.606531750710303, -14.216015371831462 -11.298959615247584, -11.988093933621874 -8.632592396596024, -10.205116381744608 -5.692099788303081, -8.92370063509075 -6, -8 -6, 0 6, 0 6, -8 5.692099788303083, -8.923700635090754 8.632592396596023, -10.205116381744608 11.298959615247584, -11.988093933621874 13.606531750710309, -14.21601537183147 15.482032539991776, -16.818133717449605 16.86590601646982, -19.711819480675892 17.71420769180006, -22.805184535568344 18, -26 18, -38 17.548702419272825, -42.00537681121366 16.217439622243546, -45.809907304116045 14.072966684424536, -49.222816433457204 11.222816433457204, -52.072966684424536 7.809907304116047, -54.217439622243546 4.00537681121366, -55.54870241927283 1.102182119232618e-15, -56 "
        ></polygon>
        <path
          d="M 7 13 A 13 13 0 0 1 14 22"
          fill="none"
          stroke="rgba(100%,100%,100%,0.8)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="-4"
          y1="4"
          x2="2"
          y2="4"
          stroke="rgba(84.31%,65.1%,7.45%,1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <text
          y="35"
          dominantBaseline="alphabetic"
          textAnchor="middle"
          fontSize="16"
          fontWeight="500"
          fill="black"
        >
          {weight <= 0 ? "?" : weight}
        </text>
      </g>
    </g>
  );
};

export default Weight;
