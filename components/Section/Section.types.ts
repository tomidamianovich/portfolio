export type LiteralsType = {
  present: string;
  years?: string;
  year?: string;
  months?: string;
  month?: string;
  seeLess: string;
  seeMore: string;
  and?: string;
  of?: string;
};

export type SectionItem = {
  date?: string;
  endDate?: string;
  title?: string;
  titleDetail?: string;
  link?: string;
  subtitle?: string;
  mode?: string;
  content?: string;
};

export enum SectionTypeEnum {
  EXPERIENCE = "experience",
  EDUCATION = "education",
  LANGUAGES = "languages",
  CERTIFICATIONS = "certifications",
}

export type SectionProps = {
  title: string;
  items: SectionItem[];
  sectionName?: string;
  isGrouped?: boolean;
  literals?: LiteralsType;
  isPillsView?: boolean;
};

export type Grouped = { title: string; items: SectionProps["items"] };
