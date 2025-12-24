export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return "a minute";
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min${minutes > 1 && "s"}`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = (seconds % 3600) / 60;
    if (minutes >= 50) return `${hours + 1} hour`;
    if (minutes <= 10) return `${hours} hour`;
    return `${hours}h ${minutes}m`;
  }
}
