import React, { useMemo, useState, useCallback } from "react";
import styles from "./Section.module.css";
import { useFormatDate } from "@/hooks/useFormatDate";
import {
  SectionTypeEnum,
  type SectionProps,
  type SectionItem,
} from "./Section.types";
import Pill, { PillVariantEnum } from "../Pill";
import { MAX_ITEMS_DEFAULT } from "./Section.constant";
import SeeMoreButton from "@/components/SeeMoreButton";
import { MdWork, MdHistory } from "react-icons/md";
import { track } from "@vercel/analytics";

type Group = { title: string; items: SectionItem[] };

const Section: React.FC<SectionProps> = ({
  title,
  items,
  sectionName,
  isGrouped = false,
  isPillsView = false,
}: SectionProps) => {
  const [isMoreItemsVisible, setIsMoreItemsVisible] = useState(false);
  const toggleMore = useCallback(() => {
    const nextValue = !isMoreItemsVisible;
    track("section_toggle_more", {
      section: sectionName,
      expanded: nextValue,
    });
    setIsMoreItemsVisible(nextValue);
  }, [isMoreItemsVisible, sectionName]);

  const { formatDate } = useFormatDate(
    sectionName === SectionTypeEnum.EXPERIENCE ||
      sectionName === SectionTypeEnum.EDUCATION
  );

  const groupedItems = useMemo(() => {
    if (!isGrouped) return [];
    const sectionItems: SectionItem[] = items;
    const grouped = Array.isArray(sectionItems)
      ? sectionItems.reduce<Record<string, Group>>(
          (acc: Record<string, Group>, item: SectionItem) => {
            const key = item.title ?? "";
            if (!acc[key]) acc[key] = { title: key, items: [] };
            acc[key].items.push(item);
            return acc;
          },
          {}
        )
      : [];
    return Object.values(grouped).map((group) => ({
      ...group,
      items: group.items.sort(
        (a: SectionItem, b: SectionItem) =>
          new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
      ),
    }));
  }, [isGrouped, items]);

  if (isGrouped)
    return (
      <div className={styles.groupedView}>
        <h2>{title}</h2>
        {groupedItems.map((group: Group) => (
          <div key={group.title} className={styles.sectionItemGrouped}>
            <h3>{group.title}</h3>
            {group.items.map((subItem: SectionItem, index: number) => {
              const isVisible = isMoreItemsVisible || index < MAX_ITEMS_DEFAULT;
              return (
                <ul
                  key={`${group.title}-${subItem.titleDetail}`}
                  className={`${styles.sectionGroupedItemContent} ${
                    isVisible ? styles.visible : styles.hidden
                  }`}
                >
                  <li>
                    {subItem.titleDetail && <span>{subItem.titleDetail}</span>}
                    {subItem.date && <span> - {formatDate(subItem.date)}</span>}
                  </li>
                </ul>
              );
            })}
            {group.items.length > MAX_ITEMS_DEFAULT && (
              <SeeMoreButton
                isMoreItemsVisible={isMoreItemsVisible}
                onButtonClick={toggleMore}
              />
            )}
          </div>
        ))}
      </div>
    );

  if (isPillsView)
    return (
      <div className={styles.pillsView}>
        <h2>{title}</h2>
        <ul>
          {Array.isArray(items) &&
            items.map((item: SectionItem) => (
              <li key={item.title}>
                <Pill
                  text={`${item.title ?? ""}${
                    item.titleDetail ? ` - ${item.titleDetail}` : ""
                  }`}
                  variant={PillVariantEnum.OUTLINED}
                />
              </li>
            ))}
        </ul>
      </div>
    );

  const dates = (item: SectionItem, isMobile: boolean) =>
    item.date && (
      <div
        className={
          (styles.sectionItemdates,
          isMobile ? styles.mobileDates : styles.desktopDates)
        }
      >
        <p>{[item.date, item.endDate].map((d) => formatDate(d)).join(" - ")}</p>
      </div>
    );

  const isExperience = sectionName === SectionTypeEnum.EXPERIENCE;
  const isEducation = sectionName === SectionTypeEnum.EDUCATION;

  return (
    <>
      <div
        className={`${styles.defaultView} ${
          isExperience ? styles.timelineView : ""
        } ${isEducation ? styles.gridView : ""}`}
      >
        <h2>{title}</h2>
        {isExperience && <div className={styles.timelineLine}></div>}
        {Array.isArray(items) &&
          items.map((item: SectionItem, index: number) => {
            const isVisible = isMoreItemsVisible || index < MAX_ITEMS_DEFAULT;
            const isCurrent = !item.endDate && item.date;
            const IconComponent = isExperience
              ? isCurrent
                ? MdWork
                : MdHistory
              : null;

            return (
              <div
                key={item.title}
                className={`${styles.sectionItem} ${
                  isVisible ? styles.visible : styles.hidden
                } ${isExperience ? styles.timelineItem : ""} ${
                  isEducation ? styles.gridItem : ""
                }`}
              >
                {isExperience && IconComponent && (
                  <div className={styles.timelineIcon}>
                    <IconComponent size={16} />
                  </div>
                )}
                <article className={styles.sectionItemContent}>
                  <h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          track("section_company_link_click", {
                            section: sectionName,
                            title: item.title,
                            link: item.link,
                          })
                        }
                      >
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                    {item.titleDetail && <span> - {item.titleDetail}</span>}
                    {item.mode && <span> - {item.mode}</span>}
                  </h3>
                  {item.subtitle && <h4>{item.subtitle}</h4>}
                  {isExperience && dates(item, false)}
                  {!isExperience && dates(item, true)}
                  {item.content && <p>{item.content}</p>}
                </article>
                {!isExperience && dates(item, false)}
              </div>
            );
          })}
        {items.length > MAX_ITEMS_DEFAULT && (
          <SeeMoreButton
            isMoreItemsVisible={isMoreItemsVisible}
            onButtonClick={toggleMore}
          />
        )}
      </div>
    </>
  );
};

export default Section;
