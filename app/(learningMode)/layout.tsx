"use client";

import "@/globals.css";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "@stack/client";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const handler = () => {
      document.body.style.height = `${window.visualViewport?.height ?? window.innerHeight}px`;
    };

    handler();
    window.visualViewport?.addEventListener("resize", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.visualViewport?.removeEventListener("resize", handler);
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    };
  }, []);

  return (
    <div className={"h-dvh overflow-hidden"}>
      <StackProvider app={stackClientApp}>
        <StackTheme>{children}</StackTheme>
      </StackProvider>
    </div>
  );
}
