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

  return (
    <button
      className={`${styles.button} ${variantClass} ${sizeClass} `}
      type="button"
      onClick={handleClick}
      aria-selected={active}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
