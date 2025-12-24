export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return "a minute";
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${minutes > 1 ? "mins" : "min"}`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (minutes >= 50) return `${hours + 1} hours`;
    if (minutes <= 10) return `${hours} ${hours > 1 ? "hours" : "hour"}`;
    return `${hours}h ${minutes}m`;
  }
}
