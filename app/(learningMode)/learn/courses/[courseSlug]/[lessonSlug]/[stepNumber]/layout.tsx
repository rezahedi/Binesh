import { X, Zap } from "lucide-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="flex items-center sticky shadow-lg p-6">
        <div>
          <X />
        </div>
        <div className="grow">
          <div className="max-w-2xl mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-[#29cc57] h-2.5 rounded-full" style={{width: '45%'}}></div>
            </div>
          </div>
        </div>
        <div>
          <Zap className="text-[#ea580c]" />
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
