"use client";

import Header from "./components/Header";
import { ProgressProvider } from "./ProgressContext";
import Content from "./components/Content";

export default function Page() {
  return (
    <ProgressProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <Content className="flex-1" />
      </div>
    </ProgressProvider>
  );
}
