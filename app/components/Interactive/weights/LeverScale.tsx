import { cn } from "@/utils/cn";
import Scale from "./Scale";
import { InteractiveComponentProps } from "@/components/Interactive/types";
import { useQuiz } from "@/contexts/QuizContext";

const WIDTH = 540;
const HEIGHT = 250;
const MAX_ANGLE = 20;

export type LeverScaleProps = {
  masses: [number, number][];
  draggableWeightIndex?: number;
  rodLength: number;
  fulcrum: number;
  showResult: boolean;
  isActive: boolean;
};

const LeverScale = ({
  isActive = true,
  props,
}: InteractiveComponentProps & { props: LeverScaleProps }) => {
  const { fulcrum, rodLength, draggableWeightIndex = null } = props;
  const { userAnswer, revealResult } = useQuiz();

  const masses = (() => {
    if (!userAnswer) return props.masses;

    return replaceUndefined(
      props.masses,
      Number(userAnswer),
      draggableWeightIndex
    );
  })();

  const angle = (() => {
    if (!revealResult) return 0;

    const weightDiff =
      Math.abs(masses[1][0] * masses[1][1]) -
      Math.abs(masses[0][0] * masses[0][1]);

    if (weightDiff > MAX_ANGLE) return MAX_ANGLE;
    if (weightDiff < -MAX_ANGLE) return -MAX_ANGLE;
    return weightDiff;
  })();

  if (!masses || !fulcrum || !rodLength) {
    return (
      <div className="border border-destructive px-8 py-4 text-destructive">
        <p>Component: LeverScale</p>
        <p>Error: Missing props</p>
        <p>Expected Props: masses, fulcrum, rodLength</p>
      </div>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={cn("bg-white rounded-xl", !isActive && "pointer-events-none")}
    >
      <Scale
        x={WIDTH * 0.1}
        y={30}
        width={WIDTH * 0.8}
        angle={angle}
        {...props}
        isActive={revealResult ? false : isActive}
        masses={masses}
      />
    </svg>
  );
};

export default LeverScale;

const replaceUndefined = (
  masses: [number, number][],
  value: number | null,
  index: number | null
): [number, number][] => {
  if (value === null) return masses;

  if (index === null)
    return masses.map((m) => [m[0] === -1 ? value : m[0], m[1]]);

  return masses.map((m, i) => [m[0], i === index ? value : m[1]]);
};
