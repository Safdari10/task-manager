export const formatDate = (dateString: string): string => {
  // Parse as UTC if possible
  let date: Date;
  if (dateString.endsWith("Z") || dateString.includes("+")) {
    date = new Date(dateString);
  } else {
    // If no timezone info, treat as UTC
    date = new Date(dateString + "Z");
  }
  if (isNaN(date.getTime())) return "";

  const now = new Date();

  // Compare local year/month/day
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  // Calculate yesterday in local time
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
