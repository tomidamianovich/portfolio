import React from "react";
import styles from "./Pill.module.css";
import type { PillType } from "./Pill.types";
import { PillVariantEnum, PillSizeEnum, IconTypeEnum } from "./Pill.types";

import { FaLinkedinIn } from "react-icons/fa";
import { PiInstagramLogoLight } from "react-icons/pi";
import { FiGithub } from "react-icons/fi";

const Pill: React.FC<PillType> = ({
  text,
  href,
  variant = PillVariantEnum.PRIMARY,
  size = PillSizeEnum.MEDIUM,
  icon,
  index,
}) => {
  const variantClass =
    variant === PillVariantEnum.OUTLINED ? styles.outlined : styles.primary;

  const sizeClass =
    size === PillSizeEnum.SMALL
      ? styles.small
      : size === PillSizeEnum.LARGE
      ? styles.large
      : styles.medium;

  const clickable = href != null ? styles.clickable : null;

  const classNames = `${styles.pill} ${variantClass} ${sizeClass} ${clickable}`;

  const Icon = () => {
    if (!icon) return null;
    switch (icon) {
      case IconTypeEnum.INSTAGRAM:
        return <PiInstagramLogoLight />;
      case IconTypeEnum.LINKEDIN:
        return <FaLinkedinIn />;
      case IconTypeEnum.GITHUB:
        return <FiGithub />;
      default:
        return null;
    }
  };

  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        target="_blank"
        rel="noopener noreferrer"
      >
        {!!icon && <Icon />}
        {!!text && <span>{text}</span>}
      </a>
    );
  }

  return (
    <span className={classNames}>
      {<span className={styles.languageDot} data-index={index} />}
      {!!text && <span>{text}</span>}
    </span>
  );
};

export default Pill;
