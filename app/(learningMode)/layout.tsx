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
    document.body.classList.add("h-screen", "overflow-hidden");
    return () => {
      document.body.classList.remove("h-screen", "overflow-hidden");
    };
  }, []);

  return (
    <StackProvider app={stackClientApp}>
      <StackTheme>{children}</StackTheme>
    </StackProvider>
  );
}
