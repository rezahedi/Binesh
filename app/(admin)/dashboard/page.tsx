import { TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="bg-background p-6">
        <div className="flex flex-col h-full">
          <div className="flex grow">
            <div className="grow space-y-2">
              <div className="text-muted-foreground">Total Users</div>
              <div className="text-3xl font-semibold tabular-nums @[250px]/card:text-3xl">
                17,250
              </div>
            </div>
            <Badge variant="outline" className="self-start space-x-2">
              <TrendingUpIcon />
              <span>+12.5%</span>
            </Badge>
          </div>
          <div className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Users sign up for the last 6 months
            </div>
          </div>
        </div>
      </Card>
      <Card className="bg-background p-6">Some stats</Card>
      <Card className="bg-background p-6">Some stats</Card>
      <Card className="bg-background p-6">Some stats</Card>
    </div>
  );
}
