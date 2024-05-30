import { X, Zap } from "lucide-react";
import MegaProgressBar from "./components/MegaProgressBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="flex items-center sticky top-0 bg-white shadow-lg p-6">
        <div>
          <X />
        </div>
        <div className="grow">
          <MegaProgressBar className="max-w-2xl mx-auto" steps={[
            { title: "Step 1", percentage: 10, progress: 100 },
            { title: "Step 2", percentage: 30, progress: 45 },
            { title: "Step 3", percentage: 20, progress: 0 },
            { title: "Step 4", percentage: 40, progress: 0 }
          ]} />
        </div>
        <div>
          <Zap className="text-[#ea580c]" />
        </div>
      </header>
      <main className="max-w-2xl mx-auto py-6">
        {children}
      </main>
    </div>
  );
}
