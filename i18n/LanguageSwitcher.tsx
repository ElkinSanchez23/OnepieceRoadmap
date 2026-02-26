"use client";

import { useState } from "react";
import { useRouter, usePathname } from "./navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { Globe } from "lucide-react";
import Image from "next/image";

import flagEN from "@/assets/flags/en.png";
import flagES from "@/assets/flags/es.png";
import flagFR from "@/assets/flags/fr.png";
import flagDE from "@/assets/flags/de.png";
import flagJP from "@/assets/flags/jp.png";

const languages = [
  { code: "en", label: "English", flag: flagEN },
  { code: "es", label: "Español", flag: flagES },
  { code: "fr", label: "Français", flag: flagFR },
  { code: "de", label: "Deutsch", flag: flagDE },
  { code: "jp", label: "日本語", flag: flagJP },
];

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [showMenu, setShowMenu] = useState(false);

  const currentLang = languages.find((l) => l.code === locale) ?? languages[0];

const changeLanguage = (newLocale: string) => {
  if (!routing.locales.includes(newLocale as any)) return;
  document.cookie = `preferredLocale=${newLocale}; path=/; max-age=31536000`;
  localStorage.setItem("preferredLocale", newLocale);
  const cleanPath = pathname.replace(/^\/(en|es|fr|de|jp)/, "");
  const finalPath = `/${newLocale}${cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`}`;

  router.replace(finalPath);
  setShowMenu(false);
};

  return (
    <div className="relative text-sm z-50">
      <button
        aria-haspopup="listbox"
        aria-expanded={showMenu}
        className="cursor-pointer flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-zinc-800 transition-all duration-200"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <div className="relative w-6 h-4">
          <Image
            src={currentLang.flag}
            alt={currentLang.label}
            fill
            className="object-contain rounded-sm"
            sizes="24px"
          />
        </div>
        <span className="hidden sm:inline">{currentLang.label}</span>
        <Globe className="w-4 h-4 text-white ml-1" />
      </button>

      {showMenu && (
        <div
          role="listbox"
          className=" absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg animate-fadeIn"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors duration-150 ${
                lang.code === locale ? "font-semibold bg-gray-50" : ""
              }`}
              tabIndex={0}
            >
              <div className="relative w-6 h-4">
                <Image
                  src={lang.flag}
                  alt={lang.label}
                  fill
                  className="object-contain rounded-sm"
                  sizes="24px"
                />
              </div>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
