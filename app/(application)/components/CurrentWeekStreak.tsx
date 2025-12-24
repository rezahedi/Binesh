import { cn } from "@/utils/cn";
import { StreakResponseStreakHistoryItem } from "@trophyso/node/api";
import { ZapIcon } from "lucide-react";

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

const CurrentWeekStreak = ({
  history,
  isTodayDone,
}: {
  history?: StreakResponseStreakHistoryItem[];
  isTodayDone?: boolean;
}) => {
  if (!history) return null;

  const today = new Date();
  const todayKey = today.toLocaleDateString("en-CA");

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const historyMap = new Map(history.map((h) => [h.periodStart, h]));

  const currentWeekStreak = WEEK_DAYS.map((day, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);

    const dateKey = date.toLocaleDateString("en-CA");

    const historyItem = historyMap.get(dateKey);

    return {
      day,
      date: date.toDateString(),
      streak:
        dateKey === todayKey && !isTodayDone ? 0 : (historyItem?.length ?? 0),
      usedFreeze: historyItem?.usedFreeze ?? false,
      isToday: dateKey === todayKey,
    };
  });

  return (
    <div className="flex justify-around gap-1.5 text-center text-sm text-border">
      {currentWeekStreak.map((wday, i) => (
        <div
          title={wday.isToday ? "Today" : wday.date}
          key={i}
          className={cn(wday.streak > 0 && "text-foreground")}
        >
          <div
            className={cn(
              "size-9 flex justify-center items-center border border-muted rounded-full mb-1",
              wday.isToday && "border-3",
              wday.streak > 0 && "border-destructive",
              wday.usedFreeze && "border-accent"
            )}
          >
            <ZapIcon
              className={cn(
                "size-5 fill-muted/90 stroke-muted/90",
                wday.streak > 0 && "fill-destructive stroke-destructive",
                wday.usedFreeze && "fill-accent stroke-accent"
              )}
            />
          </div>
          <span className={wday.isToday ? "font-extrabold" : ""}>
            {wday.day}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CurrentWeekStreak;
