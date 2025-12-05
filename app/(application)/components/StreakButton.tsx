import { ZapIcon } from "lucide-react";

export default function StreakButton() {
  return (
    <button className="relative flex gap-1 items-center font-semibold text-lg">
      3 <ZapIcon className="fill-destructive/90" stroke="none" />
    </button>
  );
}
