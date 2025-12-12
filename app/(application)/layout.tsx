"use client";

import "@/globals.css";
import { Header } from "@application/components";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "@stack/client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StackProvider app={stackClientApp}>
      <StackTheme>
        <Header />
        <div className="max-w-7xl mx-auto px-2 mt-6 md:mt-10">{children}</div>
      </StackTheme>
    </StackProvider>
  );
}
