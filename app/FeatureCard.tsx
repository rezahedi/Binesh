import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  color: string;
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({
  color,
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="bg-card text-card-foreground rounded-2xl p-8 shadow-lg transition-all border-2 border-muted hover:border-muted-foreground">
      <div
        className={`bg-linear-to-br ${color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}
      >
        <Icon className="w-7 h-7 text-background" />
      </div>
      <h3 className="mb-3 font-semibold text-xl">{title}</h3>
      <p className="text-foreground/80 sm:text-lg">{description}</p>
    </div>
  );
}
