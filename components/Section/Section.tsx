import React, { useMemo } from "react";
import styles from "./Section.module.css";
import { useFormatDate } from "@/hooks/useFormatDate";
import { useDuration } from "@/hooks/useDuration";

import { SectionTypeEnum, type SectionProps } from "./Section.types";
import Pill, { PillVariantEnum } from "../Pill";
import { MAX_ITEMS_DEFAULT } from "./Section.constant";
import SeeMoreButton from "@/components/SeeMoreButton";

const Section: React.FC<SectionProps> = ({
  title,
  items,
  literals,
  sectionName,
  isGrouped = false,
  isPillsView = false,
}) => {
  if (!items || items.length === 0) return null;
  const [isMoreItemsVisible, setIsMoreItemsVisible] = React.useState(false);
  const { formatDate } = useFormatDate(
    sectionName === SectionTypeEnum.EXPERIENCE
  );
  const { calculate } = useDuration(literals!);

  if (isGrouped) {
    const groupedItems = useMemo(
      () =>
        Object.values(
          items.reduce<Record<string, SectionProps>>((acc, item) => {
            const key = item.title!;
            if (!acc[key]) acc[key] = { title: key, items: [] };
            acc[key].items!.push(item);
            return acc;
          }, {})
        ).map((group) => ({
          ...group,
          items: group.items?.sort((a, b) => {
            const dateA = new Date(a.date ?? 0).getTime();
            const dateB = new Date(b.date ?? 0).getTime();
            return dateB - dateA;
          }),
        })),
      [items]
    );

    return (
      <>
        <div className={styles.groupedView}>
          <h2>{title}</h2>
          {Array.isArray(groupedItems) &&
            groupedItems.map((group, index) => (
              <div
                key={index}
                className={styles.sectionItemGrouped}
                id="section-items"
              >
                <h4>{group?.title ?? ""}</h4>
                {group.items?.length
                  ? group.items
                      .slice(
                        0,
                        isMoreItemsVisible
                          ? group.items.length
                          : MAX_ITEMS_DEFAULT
                      )
                      .map((subItem, subIndex) => (
                        <ul
                          key={subIndex}
                          className={styles.sectionGroupedItemContent}
                        >
                          <li>
                            {subItem.titleDetail && (
                              <span>{subItem.titleDetail}</span>
                            )}
                            {subItem.date && (
                              <span> - {formatDate(subItem.date)}</span>
                            )}
                          </li>
                        </ul>
                      ))
                  : null}
                {group.items.length > MAX_ITEMS_DEFAULT && (
                  <SeeMoreButton
                    isMoreItemsVisible={isMoreItemsVisible}
                    onButtonClick={() =>
                      setIsMoreItemsVisible(!isMoreItemsVisible)
                    }
                  />
                )}
              </div>
            ))}
        </div>
      </>
    );
  }

  if (isPillsView) {
    return (
      <div className={styles.pillsView}>
        <h2>{title}</h2>
        <ul>
          {Array.isArray(items) &&
            items.map((item) => (
              <li>
                <Pill
                  text={`${item?.title ?? ""}${
                    item?.titleDetail ? ` - ${item.titleDetail}` : ""
                  }`}
                  variant={PillVariantEnum.OUTLINED}
                />
              </li>
            ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <div className={styles.defaultView} id="section-items">
        <h2>{title}</h2>
        {Array.isArray(items) &&
          items
            .slice(0, isMoreItemsVisible ? items.length : MAX_ITEMS_DEFAULT)
            .map((item, index) => (
              <div key={index} className={styles.sectionItem}>
                {!!item.date && (
                  <div className={styles.sectionItemdates}>
                    <p>
                      {formatDate(item.date)}
                      {"endDate" in item
                        ? " - " + formatDate(item.endDate)
                        : ""}
                    </p>
                    {item.endDate && (
                      <p>{calculate(item.date, item.endDate)}</p>
                    )}
                  </div>
                )}
                <article className={styles.sectionItemContent}>
                  <h3>
                    {item?.title ?? ""}
                    <span>
                      {item?.titleDetail ? ` - ${item.titleDetail}` : ""}
                    </span>
                    <span>{item?.mode ? ` - ${item.mode}` : ""}</span>
                  </h3>
                  {!!item.subtitle && <h4>{item.subtitle}</h4>}
                  {!!item.content && <p>{item.content}</p>}
                </article>
              </div>
            ))}
      </div>
      {items.length > MAX_ITEMS_DEFAULT && (
        <SeeMoreButton
          isMoreItemsVisible={isMoreItemsVisible}
          onButtonClick={() => setIsMoreItemsVisible(!isMoreItemsVisible)}
        />
      )}
    </>
  );
};

export default Section;
