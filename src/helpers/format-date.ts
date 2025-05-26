import { parseISO } from "date-fns";

/**
 * Format date to pt-BR format
 * @param date - Date to be formatted (2021-12-31)
 * @param addHours - Add hours to date (optional)
 * @returns Formatted date (31 de dezembro de 2021) or (31 de dezembro de 2021 23:59:59)
 */
export function formatDate({
  date,
  addHours,
}: {
  date: string;
  addHours?: boolean;
}): string {
  return new Date(parseISO(date)).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: addHours ? "numeric" : undefined,
    minute: addHours ? "numeric" : undefined,
    second: addHours ? "numeric" : undefined,
  });
}
