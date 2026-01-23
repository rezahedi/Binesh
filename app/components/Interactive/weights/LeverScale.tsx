import { useEffect, useRef, useState } from "react";
import JXG from "jsxgraph";

/**
 * LeverScale Component
 * * Props:
 * @param {number} massLeft - Mass of the left weight (default: 5)
 * @param {number} massRight - Mass of the right weight (default: 10)
 * @param {number} initialPosLeft - X-coordinate for left weight (default: -5)
 * @param {number} initialPosRight - X-coordinate for right weight (default: 5)
 * @param {number} labelsPerSide - Number of tick marks on each side of the fulcrum (default: 5)
 * @param {number} fulcrumX - Horizontal position of the fulcrum (default: 0)
 * @param {number} rodLength - Total visual length of the rod (default: 10)
 */
export const LeverScale = ({
  massLeft = 5,
  massRight = 10,
  initialPosLeft = -5,
  initialPosRight = 5,
  labelsPerSide = 5,
  fulcrumX = 0,
  rodLength = 8,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<JXG.Board | null>(null);
  const [angle, setAngle] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Prevent double initialization in strict mode
    if (boardRef.current || !boxRef.current) return;

    const board = JXG.JSXGraph.initBoard(boxRef.current, {
      boundingbox: [-12, 10, 12, -10],
      axis: false,
      showCopyright: false,
      showNavigation: false,
      pan: { enabled: false },
      zoom: false,
    });
    boardRef.current = board;

    // 2. Rotation Logic based on torque relative to fulcrumX
    const getAngle = () => {
      // Torque = Mass * Distance from Fulcrum
      const dL = w1.X() - fulcrumX;
      const dR = w2.X() - fulcrumX;
      const torqueL = massLeft * dL; // Negative value usually
      const torqueR = massRight * dR; // Positive value usually
      const netTorque = torqueL + torqueR;

      // Clamp rotation for visual stability
      setAngle(Math.max(Math.min(-netTorque * 0.02, 0.5), -0.5));
      return 0;
    };

    const rot = board.create(
      "transform",
      [showResult ? angle : getAngle, fulcrumX, 0],
      {
        type: "rotate",
      }
    );

    // 3. The Rod
    const pL = board.create("point", [fulcrumX - rodLength, 0], {
      visible: false,
    });
    const pR = board.create("point", [fulcrumX + rodLength, 0], {
      visible: false,
    });
    rot.bindTo([pL, pR]);

    const rod = board.create("segment", [pL, pR], {
      strokeColor: "white",
      strokeWidth: 12,
      name: "RO",
      withLabel: true,
      label: { offset: [0, 35], anchorX: "middle", fontWeight: "bold" },
    });

    // 4. Dynamic Tick Marks
    const step = rodLength / labelsPerSide;
    const snapPositions: number[] = [];
    for (let i = -labelsPerSide; i <= labelsPerSide; i++) {
      if (i === 0) continue;
      const xPos = fulcrumX + i * step;
      snapPositions.push(xPos);
      const tPoint = board.create("point", [xPos, 0], { visible: false });
      rot.bindTo(tPoint);

      board.create("point", [() => tPoint.X(), () => tPoint.Y()], {
        name: Math.abs(i).toString(),
        size: 4,
        face: "|",
        strokeColor: "#94a3b8",
        fixed: true,
        label: {
          offset: [0, 15],
          fontSize: 10,
          strokeColor: "#94a3b8",
          anchorX: "middle",
        },
      });
    }

    // 1. Fulcrum (Static Position)
    const anchor = board.create("point", [fulcrumX, 2], {
      visible: false,
      fixed: true,
      highlight: false,
    });

    const hangerBottom = board.create("point", [fulcrumX, 0], {
      visible: false,
      fixed: true,
      highlight: false,
    });

    board.create("segment", [anchor, hangerBottom], {
      strokeColor: "brown",
      strokeWidth: 4,
      fixed: true,
      highlight: false,
    });

    board.create("circle", [hangerBottom, 0.4], {
      fillColor: "brown",
      fillOpacity: 1,
      strokeWidth: 0,
      fixed: true,
      highlight: false,
    });

    // 5. Weight Gliders (Draggable Handles)
    const w1 = board.create("glider", [initialPosLeft, 0, rod], {
      size: 8,
      fillColor: "blue",
      strokeColor: "#3b82f6",
      strokeWidth: 4,
      label: { offset: [0, 20], fontSize: 10 },
    });

    w1.on("drag", () => {
      // find nearest snap position
      const closest = snapPositions.reduce((prev, curr) =>
        Math.abs(curr - w1.X()) < Math.abs(prev - w1.X()) ? curr : prev
      );
      // move glider to that X
      w1.setPosition(JXG.COORDS_BY_USER, [closest, 0]);
    });

    const w2 = board.create("glider", [initialPosRight, 0, rod], {
      size: 8,
      fillColor: "white",
      strokeColor: "#ef4444",
      strokeWidth: 4,
      label: { offset: [0, 20], fontSize: 10 },
    });

    w2.on("drag", () => {
      // find nearest snap position
      const closest = snapPositions.reduce((prev, curr) =>
        Math.abs(curr - w2.X()) < Math.abs(prev - w2.X()) ? curr : prev
      );
      // move glider to that X
      w2.setPosition(JXG.COORDS_BY_USER, [closest, 0]);
    });

    // 6. Visual Weight Bodies (Suspended)
    // Left Weight
    const weightBodyL = board.create(
      "point",
      [() => w1.X(), () => w1.Y() - 2],
      {
        name: massLeft + "kg",
        size: 15 + massLeft * 1.5,
        fillColor: "#3b82f6",
        strokeColor: "#1d4ed8",
        withLabel: true,
        label: { offset: [-10, 0], color: "white" },
      }
    );
    board.create("segment", [w1, weightBodyL], {
      strokeColor: "#475569",
      strokeWidth: 4,
    });

    // Right Weight
    const weightBodyR = board.create(
      "point",
      [() => w2.X(), () => w2.Y() - 2.5],
      {
        name: massRight + "kg",
        size: 15 + massRight * 1.5,
        fillColor: "#ef4444",
        strokeColor: "#b91c1c",
        withLabel: true,
        label: { offset: [-10, 0], color: "white" },
      }
    );
    board.create("segment", [w2, weightBodyR], {
      strokeColor: "#475569",
      strokeWidth: 2,
    });

    board.update();

    return () => {
      JXG.JSXGraph.freeBoard(board);
      boardRef.current = null;
    };
  }, [
    massLeft,
    massRight,
    initialPosLeft,
    initialPosRight,
    labelsPerSide,
    fulcrumX,
    rodLength,
    showResult,
  ]);

  const handleShowResult = () => {
    setShowResult(true);
  };

  return (
    <div>
      <div ref={boxRef} className="w-full h-[500px]" id="jxgbox" />
      <button onClick={handleShowResult}>result</button>
    </div>
  );
};
