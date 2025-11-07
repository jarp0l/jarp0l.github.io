/**
 * Formats a date as a human-readable string
 * @param date - The date to format
 * @returns Formatted date string (e.g., "Tue, April 1, 2025")
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/**
 * Formats a date as an ISO 8601 string
 * @param date - The date to format
 * @returns ISO 8601 formatted date string
 */
export function formatISO8601(date: Date): string {
  return date.toISOString();
}

/**
 * Converts a date string or Date object to a Date object
 * @param date - The date to convert
 * @returns Date object
 */
export function toDateObject(date: string | Date): Date {
  return typeof date === "string" ? new Date(date) : date;
}
