"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import ptJson from "../../locales/pt.json";
import enJson from "../../locales/en.json";
import cnJson from "../../locales/cn.json";

// 🔹 Tipagem segura para JSONs
const pt: Record<string, any> = ptJson;
const en: Record<string, any> = enJson;
const cn: Record<string, any> = cnJson;

type Locale = "pt" | "en" | "cn";

const translations: Record<Locale, Record<string, any>> = { pt, en, cn };

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "pt",
  setLocale: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale | null;
    if (savedLocale && ["pt", "en", "cn"].includes(savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = (key: string) => {
    return translations[locale][key] || translations.pt[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
