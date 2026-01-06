import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/globals.css";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@stack/server";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <StackProvider app={stackServerApp}>
          <StackTheme>{children}</StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
