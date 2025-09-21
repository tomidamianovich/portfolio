import { type LiteralsType } from "@/components/Section";

export function useDuration(literals: LiteralsType) {
  const calculate = (start: string | Date, end?: string | Date) => {
    const s = typeof start === "string" ? new Date(start) : start;
    const e = end
      ? typeof end === "string"
        ? new Date(end)
        : end
      : new Date();

    let years = e.getFullYear() - s.getFullYear();
    let months = e.getMonth() - s.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    const yearsText =
      years > 0 ? `${years} ${years > 1 ? literals.years : literals.year}` : "";
    const monthsText =
      months > 0
        ? `${months} ${months > 1 ? literals.months : literals.month}`
        : "";

    return (
      [yearsText, monthsText].filter(Boolean).join(" y ") ||
      `0 ${literals.month}`
    );
  };

  return { calculate };
}
