import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@website/globals.css";
import { Header } from "@application/components";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "@stack/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | Binesh",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <Header />
            <div className="max-w-7xl mx-auto px-2 mt-6 md:mt-10">
              {children}
            </div>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
