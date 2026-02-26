import Image from "next/image";
import heroImage from "@/assets/GeneralImages/One_Piece.png";
import ButtonRedirect from "@/components/GeneralComponents/Button";
import { createTranslator } from "next-intl";
import landingMessagesES from "@/messages/es/landing.json";
import landingMessagesEN from "@/messages/en/landing.json";
import landingMessagesFR from "@/messages/fr/landing.json";
import landingMessagesDE from "@/messages/de/landing.json";
import landingMessagesJP from "@/messages/jp/landing.json";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";

type Params = {
  params: Promise<{
    locale: "es" | "en" | "fr" | "de" | "jp";
  }>;
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return [
    { locale: "es" },
    { locale: "en" },
    { locale: "fr" },
    { locale: "de" },
    { locale: "jp" },
  ];
}

const messagesMap = {
  es: landingMessagesES,
  en: landingMessagesEN,
  fr: landingMessagesFR,
  de: landingMessagesDE,
  jp: landingMessagesJP,
};

export default async function LandingPage({ params }: Params) {
  const { locale } = await params;

  const messages = messagesMap[locale] ?? messagesMap["en"];
  const t = createTranslator({
    locale,
    messages,
  });
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white font-sans relative">
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-36">
        <Image
          src={heroImage}
          alt={t("heroImageAlt")}
          fill
          className="object-cover opacity-30 z-0"
          priority
        />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t("heroTitle")}
          </h1>
          <p className="text-lg md:text-xl mb-8">{t("heroSubtitle")}</p>
          <ButtonRedirect route="/home" text={t("startAdventure")} />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {t("aboutTitle")}
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          {t("aboutParagraph1")}
        </p>
        <p className="mt-4 text-lg text-gray-300">{t("aboutParagraph2")}</p>
        <p className="mt-4 text-lg text-gray-300">{t("aboutParagraph3")}</p>
        <p className="mt-4 text-lg text-gray-300">{t("aboutParagraph4")}</p>
      </section>

      <section className="bg-[#111] py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-lg text-gray-300">
            <li>✨ {t("benefits.explore")}</li>
            <li>🧠 {t("benefits.understand")}</li>
            <li>📚 {t("benefits.remember")}</li>
            <li>🌍 {t("benefits.connect")}</li>
          </ul>
        </div>
      </section>


    </main>
  );
}
