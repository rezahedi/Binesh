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
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 hover:border-gray-900">
      <div
        className={`bg-linear-to-br ${color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 border-2 border-gray-900`}
      >
        <Icon className="w-7 h-7 text-gray-900" />
      </div>
      <h3 className="mb-3 font-semibold text-lg text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
