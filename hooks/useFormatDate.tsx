import { useTranslation } from "react-i18next";
import { capitalizeFirst } from "@/helpers/string";
import { useState, useEffect } from "react";

export function useFormatDate(showPresentLiteral = false) {
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState(i18n.language);

  useEffect(() => {
    setLocale(i18n.language);
  }, [i18n.language]);

  const formatDate = (
    date?: string | Date,
    options?: Intl.DateTimeFormatOptions
  ) => {
    if (date == null && showPresentLiteral)
      return capitalizeFirst(t("literals.present"));

    const d = typeof date === "string" ? new Date(date) : date;

    const formatted = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      ...(options || {}),
    }).format(d);

    return capitalizeFirst(formatted);
  };

  return { formatDate };
}
