export function safeDate(dateString?: string | null): Date | null {
  if (!dateString) return null;

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function formatDay(dateString: string): string {
  const date = safeDate(dateString);
  return date ? date.getDate().toString().padStart(2, "0") : "--";
}

export function formatMonth(dateString: string): string {
  const date = safeDate(dateString);

  if (!date) return "---";

  return date
    .toLocaleDateString("en-US", { month: "short" })
    .replace(".", "")
    .toUpperCase();
}

export function formatEventDate(startDate: string, endDate: string): string {
  const start = safeDate(startDate);
  const end = safeDate(endDate);

  if (!start || !end) {
    return "Date to be confirmed";
  }

  const startLabel = start.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });

  const endLabel = end.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return `${startLabel} - ${endLabel}`;
}

export function formatSessionHour(dateString?: string | null): string {
  const date = safeDate(dateString);

  if (!date) {
    return "--:--";
  }

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isEventLive(startDate: string, endDate: string): boolean {
  const start = safeDate(startDate);
  const end = safeDate(endDate);

  if (!start || !end) {
    return false;
  }

  const now = new Date();
  return start <= now && end >= now;
}

export function isSessionLive(startTime: string, endTime: string): boolean {
  const start = safeDate(startTime);
  const end = safeDate(endTime);

  if (!start || !end) {
    return false;
  }

  const now = new Date();
  return start <= now && end >= now;
}
