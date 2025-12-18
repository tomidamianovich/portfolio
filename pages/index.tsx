import "@/i18n";
import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Pill, { PillVariantEnum, IconTypeEnum } from "@/components/Pill";
import LanguageSelector from "@/components/LanguageSelector";
import DarkModeToggle from "@/components/DarkModeToggle";

import { GrLocationPin } from "react-icons/gr";
import { FaRegFlag } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { GoMail } from "react-icons/go";

import styles from "@/styles/Home.module.css";
import { useTranslation, UseTranslationResponse } from "react-i18next";
import Section, {
  LiteralsType,
  type SectionItem,
  SectionTypeEnum,
} from "@/components/Section";
import GoToTop from "@/components/GoToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type ContactItemType = {
  label: string;
  url: string;
  icon?: IconTypeEnum;
};

export default function Home() {
  const { t } = useTranslation("common", {
    useSuspense: false,
  }) as UseTranslationResponse<"common", undefined>;

  const contacts = t("contact", { returnObjects: true }) as ContactItemType[];
  const experience = t("experience.items", {
    returnObjects: true,
  }) as SectionItem[];
  const education = t("education.items", {
    returnObjects: true,
  }) as SectionItem[];
  const languages = t("languages.items", {
    returnObjects: true,
  }) as SectionItem[];
  const certifications = t("certifications.items", {
    returnObjects: true,
  }) as SectionItem[];
  const literals = t("literals", {
    returnObjects: true,
  }) as LiteralsType;

  const sectionItems: Record<SectionTypeEnum, SectionItem[]> = {
    [SectionTypeEnum.EXPERIENCE]: experience,
    [SectionTypeEnum.EDUCATION]: education,
    [SectionTypeEnum.LANGUAGES]: languages,
    [SectionTypeEnum.CERTIFICATIONS]: certifications,
  };

  return (
    <>
      <Head>
        <title>{t("seo.title")}</title>
        <meta name="description" content={t("seo.description")} />
      </Head>
      <nav className={styles.selectorsWrapper}>
        <DarkModeToggle />
        <hr />
        <LanguageSelector />
      </nav>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <header>
          <div className={styles.imageWrapper}>
            <Image
              src="/profile-pic.png"
              alt="Foto de perfil de Tomás Damianovich Reddy"
              width={152}
              height={152}
              quality={100}
            />
          </div>
          <div className={styles.baseInfo}>
            <h1>{t("name")}</h1>
            <p>{t("position")}</p>
            <p className={styles.titleDetail}>
              <GrLocationPin size={16} aria-hidden />
              <span>{t("titleDetail")}</span>
            </p>
            <p className={styles.nationality}>
              <FaRegFlag size={16} aria-hidden />
              <span>{t("nationality")}</span>
            </p>
            <p className={styles.phone}>
              <FiPhone size={16} aria-hidden />
              <a href="tel:+34667094477">{t("phone")}</a>
            </p>
            <p className={styles.email}>
              <GoMail size={16} aria-hidden />
              <a href={`mailto:${t("email")}`}>{t("email")}</a>
            </p>
          </div>
          <div className={styles.headerPillsWrapper}>
            {Array.isArray(contacts) &&
              contacts.map((item, index) => (
                <Pill
                  key={index}
                  icon={item.icon}
                  href={item.url}
                  text={item.label}
                  variant={PillVariantEnum.OUTLINED}
                />
              ))}
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.about}>
            <h2>{t("about.title")}</h2>
            {!!t("about.content") && (
              <div dangerouslySetInnerHTML={{ __html: t("about.content") }} />
            )}
          </div>
          {Object.values(SectionTypeEnum).map((section, key) => (
            <Section
              title={t(`${section}.title`)}
              items={sectionItems[section] ?? []}
              literals={literals}
              sectionName={section}
              isGrouped={section === SectionTypeEnum.CERTIFICATIONS}
              isPillsView={section === SectionTypeEnum.LANGUAGES}
              key={key}
            />
          ))}
          <GoToTop
            ariaLabel={t("goToTop.ariaLabel")}
            title={t("goToTop.title")}
          />
        </main>
      </div>
    </>
  );
}
