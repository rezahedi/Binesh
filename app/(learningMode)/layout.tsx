import type { Metadata } from "next";
import "@/globals.css";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "@stack/client";

export const metadata: Metadata = {
  title: "Home | Binesh",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"h-screen overflow-hidden"}>
      <StackProvider app={stackClientApp}>
        <StackTheme>{children}</StackTheme>
      </StackProvider>
    </div>
  );
}
