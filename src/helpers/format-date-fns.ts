import { parseISO, format as formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDateFns = ({
  date,
  format,
}: {
  date: string;
  format: string;
}) => {
  if (!date) return "";

  return formatDate(parseISO(date), format, {
    locale: ptBR,
  });
};
