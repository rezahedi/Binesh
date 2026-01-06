import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "@/globals.css";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@stack/server";
import { cn } from "./utils/cn";

const inter = Inter({ subsets: ["latin"] });
const mdSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-md-serif-display",
});

export const metadata: Metadata = {
  title: "Binesh - Learn through practice",
  description:
    "Binesh is an open-source learning platform designed to make content creation effortless for teachers and learning more engaging for everyone.",
};

export const viewport = {
  interactiveWidget: "resizes-content" as const,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, mdSerifDisplay.variable)}>
        <StackProvider app={stackServerApp}>
          <StackTheme>{children}</StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
