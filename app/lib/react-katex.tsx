import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

type Props = {
  math: string;
  className?: string;
};

export function InlineMath({ math, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    katex.render(math, ref.current, {
      throwOnError: false,
      displayMode: false,
    });
  }, [math]);

  return <span ref={ref} className={className} />;
}

export function BlockMath({ math, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    katex.render(math, ref.current, {
      throwOnError: false,
      displayMode: true,
    });
  }, [math]);

  return <div ref={ref} className={className} />;
}
