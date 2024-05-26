import { X, Zap } from "lucide-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="flex sticky shadow-lg p-6">
        <div>
          <X />
        </div>
        <div className="grow">
          <div className="max-w-2xl mx-auto">
            Progress bar
          </div>
        </div>
        <div>
          <Zap />
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
