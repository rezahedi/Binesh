import Link from "next/link";
import {X, Zap} from "lucide-react";
import ProgressBar from "./ProgressBar";
import useProgress from "../useProgress";

export default function Header() {
  const {progress} = useProgress();

  return (
    <header className="flex items-center sticky top-0 bg-white shadow-lg p-6">
      <div>
        <Link href="../">
          <X />
        </Link>
      </div>
      <div className="grow">
        <ProgressBar
          className="max-w-2xl mx-auto px-4"
          title=""
          progress={progress}
          focused={true}
        />
      </div>
      <div>
        <Zap className="text-[#ea580c]" />
      </div>
    </header>
  );
}
