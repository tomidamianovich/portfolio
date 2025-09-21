export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  OUTLINED = "outlined",
}

export enum ButtonSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export type ButtonType = {
  text: string;
  onClick?: (e: Event) => void;
  disabled?: boolean;
  active?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
};
