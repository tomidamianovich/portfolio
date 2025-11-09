import { useTranslation } from "react-i18next";
import { capitalizeFirst } from "@/helpers/string";

export function useFormatDate(showPresentLiteral = false) {
  const { t, i18n } = useTranslation();

  const formatDate = (
    date?: string | Date,
    options?: Intl.DateTimeFormatOptions
  ) => {
    if (date === null) {
      console.log(
        "Formatting date:",
        "date: " + date + " showPresentLiteral: " + showPresentLiteral
      );
    }
    if (date == null && showPresentLiteral)
      return capitalizeFirst(t("literals.present"));

    const d = typeof date === "string" ? new Date(date) : date;

    const formatted = new Intl.DateTimeFormat(i18n.language, {
      year: "numeric",
      month: "long",
      ...(options || {}),
    }).format(d);

    return capitalizeFirst(formatted);
  };

  return { formatDate };
}
