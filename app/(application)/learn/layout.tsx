import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@website/globals.css";
import { Header } from "@application/components";

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
      <body className={inter.className}>
        <Header />
        <div className="max-w-7xl mx-auto px-2 mt-3 md:mt-10">{children}</div>
      </body>
    </html>
  );
}
