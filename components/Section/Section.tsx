import React from "react";
import styles from "./Section.module.css";
import { useFormatDate } from "@/hooks/useFormatDate";
import { useDuration } from "@/hooks/useDuration";
import type { SectionProps } from "./Section.types";

const Section: React.FC<SectionProps> = ({ title, items, literals }) => {
  if (!items || items.length === 0) return null;

  const { formatDate } = useFormatDate();
  const { calculate } = useDuration(literals);

  return (
    <>
      <div className={styles.wrapper}>
        <h3>{title}</h3>
        {Array.isArray(items) &&
          items.map((item, index) => (
            <div key={index} className={styles.sectionItem}>
              {!!item.date && (
                <div className={styles.sectionItemdates}>
                  <p>
                    {formatDate(item.date)}
                    {item.enddate ? " - " + formatDate(item.enddate) : ""}
                  </p>
                  {item.enddate && <p>{calculate(item.date, item.enddate)}</p>}
                </div>
              )}
              <div className={styles.sectionItemContent}>
                <h3>
                  {item?.company ?? ""}
                  <span>{item?.location ? ` - ${item.location}` : ""}</span>
                </h3>
                {!!item.title && <h4>{item.title}</h4>}
                {!!item.description && <p>{item.description}</p>}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Section;
