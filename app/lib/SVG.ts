export function getSvgPoint(
  svg: SVGSVGElement,
  clientX: number,
  clientY: number
): DOMPoint | null {
  if (!svg) return null;

  const CTM = svg.getScreenCTM();
  if (!CTM) return null;

  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  return pt.matrixTransform(CTM.inverse());
}
