import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@website/globals.css";
import { cn } from "@/utils/cn";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "@stack/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | Binesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "h-screen overflow-hidden")}>
        <StackProvider app={stackClientApp}>
          <StackTheme>{children}</StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
