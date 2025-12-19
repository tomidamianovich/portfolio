export enum PillVariantEnum {
  PRIMARY = "primary",
  OUTLINED = "outlined",
}

export enum PillSizeEnum {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export enum IconTypeEnum {
  INSTAGRAM = "instagram",
  LINKEDIN = "linkedin",
  GITHUB = "github",
  GMAIL = "gmail",
}

export type PillType = {
  index?: number;
  text?: string;
  href?: string;
  variant?: PillVariantEnum;
  size?: PillSizeEnum;
  icon?: IconTypeEnum;
};
