export enum PillVariant {
  PRIMARY = "primary",
  OUTLINED = "outlined",
}

export enum PillSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export type PillType = {
  text: string;
  href?: string;
  variant?: PillVariant;
  size?: PillSize;
};
