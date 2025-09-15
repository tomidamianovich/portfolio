export type LiteralsType = {
  present: string;
  years?: string;
  year?: string;
  months?: string;
  month?: string;
};

export type SectionItem = {
  date?: string;
  enddate?: string;
  company?: string;
  location?: string;
  title?: string;
  description?: string;
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
  literals: LiteralsType;
};
