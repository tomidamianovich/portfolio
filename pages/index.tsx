import "@/i18n";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Pill, { PillVariantEnum, IconTypeEnum } from "@/components/base/Pill";
import LanguageSelector, {
  LanguageSelectorTypeEnum,
} from "@/components/features/LanguageSelector";
import DarkModeToggle from "@/components/features/DarkModeToggle";
import DOMPurify from "dompurify";

import { GrLocationPin } from "react-icons/gr";
import { FaRegFlag } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";

import styles from "@/styles/App.module.css";
import { useTranslation, UseTranslationResponse } from "react-i18next";
import Section, {
  LiteralsType,
  type SectionItem,
  SectionTypeEnum,
} from "@/components/structures/Section";
import { GoMail } from "react-icons/go";

const GoToTop = dynamic(() => import("@/components/features/GoToTop"), {
  ssr: false,
});

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
  const router = useRouter();
  const { t, i18n } = useTranslation("common", {
    useSuspense: false,
  }) as UseTranslationResponse<"common", undefined>;

  useEffect(() => {
    if (typeof window !== "undefined" && router.isReady) {
      const queryLang = router.query.lang || router.query.language;
      const supportedLngs = Object.values(LanguageSelectorTypeEnum);

      if (queryLang && typeof queryLang === "string") {
        const normalizedLang = queryLang.split("-")[0].toLowerCase();
        if (
          supportedLngs.includes(normalizedLang as LanguageSelectorTypeEnum) &&
          i18n.language !== normalizedLang
        ) {
          i18n.changeLanguage(normalizedLang);
          localStorage.setItem("language", normalizedLang);
        }
      }
    }
  }, [router.isReady, router.query, i18n]);

  // Sanitize HTML content on client side
  useEffect(() => {
    if (typeof window !== "undefined" && t("about.content")) {
      const sanitized = DOMPurify.sanitize(t("about.content"), {
        ALLOWED_TAGS: ["p", "br", "strong", "em", "u", "a"],
        ALLOWED_ATTR: ["href", "target", "rel"],
      });
      setSanitizedAboutContent(sanitized);
    }
  }, [t, i18n.language]);

  const currentLang = i18n.language || "en";
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [sanitizedAboutContent, setSanitizedAboutContent] =
    useState<string>("");

  useEffect(() => {
    setMounted(true);
    // Reduced delay for better UX - still protects against basic scraping
    const timer = setTimeout(() => {
      const emailText = t("email");
      const phoneText = t("phone");
      setEmail(emailText);
      setPhone(phoneText);
    }, 50);
    return () => clearTimeout(timer);
  }, [t]);

  // Memoize translations to avoid recalculating on every render
  const contacts = useMemo(
    () => t("contact", { returnObjects: true }) as ContactItemType[],
    [t]
  );
  const experience = useMemo(
    () =>
      t("experience.items", {
        returnObjects: true,
      }) as SectionItem[],
    [t]
  );
  const education = useMemo(
    () =>
      t("education.items", {
        returnObjects: true,
      }) as SectionItem[],
    [t]
  );
  const languages = useMemo(
    () =>
      t("languages.items", {
        returnObjects: true,
      }) as SectionItem[],
    [t]
  );
  const certifications = useMemo(
    () =>
      t("certifications.items", {
        returnObjects: true,
      }) as SectionItem[],
    [t]
  );
  const literals = useMemo(
    () =>
      t("literals", {
        returnObjects: true,
      }) as LiteralsType,
    [t]
  );

  const sectionItems: Record<SectionTypeEnum, SectionItem[]> = useMemo(
    () => ({
      [SectionTypeEnum.EXPERIENCE]: experience,
      [SectionTypeEnum.EDUCATION]: education,
      [SectionTypeEnum.LANGUAGES]: languages,
      [SectionTypeEnum.CERTIFICATIONS]: certifications,
    }),
    [experience, education, languages, certifications]
  );

  const currentExperience = useMemo(
    () =>
      Array.isArray(experience) && experience.length > 0 ? experience[0] : null,
    [experience]
  );
  const educationItem = useMemo(
    () =>
      Array.isArray(education) && education.length > 0 ? education[0] : null,
    [education]
  );

  // Memoize URLs to avoid recalculating
  const siteUrl = useMemo(
    () =>
      typeof window !== "undefined"
        ? window.location.origin
        : "https://www.tomasdamianovich.dev",
    []
  );
  const imageUrl = useMemo(() => `${siteUrl}/profile-pic.png`, [siteUrl]);

  // Memoize schema to avoid recalculating on every render
  const personSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: t("name"),
      jobTitle: t("position"),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Madrid",
        addressRegion: "Madrid",
        addressCountry: "ES",
      },
      image: imageUrl,
      url: siteUrl,
      sameAs: Array.isArray(contacts)
        ? contacts.map((contact) => contact.url)
        : [],
      knowsLanguage: Array.isArray(languages)
        ? languages.map((lang) => ({
            "@type": "Language",
            name: lang.title,
          }))
        : [],
      ...(educationItem && {
        alumniOf: {
          "@type": "EducationalOrganization",
          name: educationItem.title,
          url: educationItem.link || undefined,
        },
      }),
      ...(currentExperience && {
        worksFor: {
          "@type": "Organization",
          name: currentExperience.title,
          url: currentExperience.link || undefined,
        },
      }),
    }),
    [
      t,
      contacts,
      languages,
      educationItem,
      currentExperience,
      siteUrl,
      imageUrl,
    ]
  );
  const canonicalUrl = siteUrl;
  const supportedLangs = Object.values(LanguageSelectorTypeEnum);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = currentLang;
    }
  }, [currentLang]);

  return (
    <>
      <Head>
        <title>{t("seo.title")}</title>
        <meta name="description" content={t("seo.description")} />

        {supportedLangs.map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={canonicalUrl}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={t("seo.title")} />
        <meta property="og:description" content={t("seo.description")} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={t("literals.profileImageAlt")} />
        <meta property="og:site_name" content={t("name")} />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="de_DE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={t("seo.title")} />
        <meta name="twitter:description" content={t("seo.description")} />
        <meta name="twitter:image" content={imageUrl} />
        <meta
          name="twitter:image:alt"
          content={t("literals.profileImageAlt")}
        />
        <meta name="author" content={t("name")} />
        <link rel="canonical" href={canonicalUrl} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
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
              alt={t("literals.profileImageAlt")}
              width={152}
              height={152}
              quality={100}
              priority
              loading="eager"
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
            {mounted && phone && (
              <p className={styles.phone}>
                <FiPhone size={16} aria-hidden />
                <a href={`tel:${phone.replace(/[\s()\-]/g, "")}`}>{phone}</a>
              </p>
            )}
            {mounted && email && (
              <p className={styles.email}>
                <GoMail size={16} aria-hidden />
                <a href={`mailto:${email}`}>{email}</a>
              </p>
            )}
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
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizedAboutContent || t("about.content"),
                }}
              />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryLang = context.query.lang || context.query.language;
  let initialLang: string = "en";
  const supportedLngs = Object.values(LanguageSelectorTypeEnum);

  if (queryLang && typeof queryLang === "string") {
    const normalizedLang = queryLang.split("-")[0].toLowerCase();
    if (supportedLngs.includes(normalizedLang as LanguageSelectorTypeEnum)) {
      initialLang = normalizedLang;
    }
  }

  const i18n = (await import("@/i18n")).default;
  if (i18n.isInitialized && i18n.language !== initialLang) {
    await i18n.changeLanguage(initialLang);
  }

  return {
    props: {
      initialLang,
    },
  };
};
