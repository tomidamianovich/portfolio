import React from "react";
import styles from "./Button.module.css";
import { type ButtonType, ButtonVariant, ButtonSize } from "./Button.types";

const Button: React.FC<ButtonType> = ({
  text,
  onClick,
  disabled,
  active = false,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MEDIUM,
  children,
  ariaLabel,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClick) onClick(e as unknown as Event);
  };

  const variantClass =
    variant === ButtonVariant.SECONDARY
      ? styles.secondary
      : variant === ButtonVariant.OUTLINED
      ? styles.outlined
      : styles.primary;

  const sizeClass =
    size === ButtonSize.SMALL
      ? styles.small
      : size === ButtonSize.LARGE
      ? styles.large
      : styles.medium;

  const accessibleName = ariaLabel || text || (children ? undefined : "Button");

  return (
    <button
      className={`${styles.button} ${variantClass} ${sizeClass}`}
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-disabled={disabled}
      disabled={disabled}
      aria-label={accessibleName}
    >
      {children}
      {text}
    </button>
  );
};

export default Button;
