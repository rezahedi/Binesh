"use client";

import { ProgressProvider } from "./ProgressContext";
import Content from "./components/Content";

export default function Page() {
  return (
    <ProgressProvider>
      <Content />
    </ProgressProvider>
  );
}
