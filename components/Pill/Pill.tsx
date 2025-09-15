import React from "react";
import styles from "./Pill.module.css";
import type { PillType } from "./Pill.types";
import { PillVariant, PillSize } from "./Pill.types";

const Pill: React.FC<PillType> = ({
  text,
  href,
  variant = PillVariant.PRIMARY,
  size = PillSize.MEDIUM,
}) => {
  const variantClass =
    variant === PillVariant.OUTLINED ? styles.outlined : styles.primary;

  const sizeClass =
    size === PillSize.SMALL
      ? styles.small
      : size === PillSize.LARGE
      ? styles.large
      : styles.medium;

  const classNames = `${styles.pill} ${variantClass} ${sizeClass}`;

  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  }

  return <span className={classNames}>{text}</span>;
};

export default Pill;
