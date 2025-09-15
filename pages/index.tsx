import "@/i18n";
import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Pill, { PillVariant } from "@/components/Pill";
import LanguageSelector from "@/components/LanguageSelector";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";

import { FaFlag } from "react-icons/fa6";

import styles from "@/styles/Home.module.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Section, {
  LiteralsType,
  type SectionItem,
  SectionTypeEnum,
} from "@/components/Section";

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
};

export default function Home() {
  const { t, ready } = useTranslation("common", { useSuspense: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !ready) return null;

  const contacts = t("contact", { returnObjects: true }) as ContactItemType[];
  const experience = t("experience.content", {
    returnObjects: true,
  }) as SectionItem[];
  const education = t("education.content", {
    returnObjects: true,
  }) as SectionItem[];
  const languages = t("languages.content", {
    returnObjects: true,
  }) as SectionItem[];
  const certifications = t("certifications.content", {
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
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <header className={styles.header}>
          <LanguageSelector />
          <Image
            src="/profile-pic.png"
            alt="Foto de perfil de Tomás Damianovich Reddy"
            width={152}
            height={152}
            quality={100}
          />
          <div>
            <h2>{t("name")}</h2>
            <p>{t("position")}</p>
            <p className={styles.location}>
              <IoLocationSharp />
              <span>{t("location")}</span>
            </p>
            <p className={styles.nationality}>
              <FaFlag />
              <span>{t("nationality")}</span>
            </p>
            <p className={styles.phone}>
              <FaPhone />
              <span>{t("phone")}</span>
            </p>
            <div className={styles.headerPillsWrapper}>
              {Array.isArray(contacts) &&
                contacts.map((item, index) => (
                  <Pill
                    key={index}
                    text={item.label}
                    href={item.url}
                    variant={PillVariant.OUTLINED}
                  />
                ))}
            </div>
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.about}>
            <h3>{t("about.title")}</h3>
            <p>{t("about.content")}</p>
          </div>
          {Object.values(SectionTypeEnum).map((section, key) => (
            <Section
              title={t(`${section}.title`)}
              items={sectionItems[section] ?? []}
              literals={literals}
              key={key}
            />
          ))}
        </main>
      </div>
    </>
  );
}
