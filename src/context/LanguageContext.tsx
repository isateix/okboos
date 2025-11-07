"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import ptJson from "../../locales/pt.json";
import enJson from "../../locales/en.json";
import cnJson from "../../locales/cn.json";

// 🔹 Tipo baseado no JSON do português
type Translations = typeof ptJson;

// 🔹 Tipagem das línguas disponíveis
type Locale = "pt" | "en" | "cn";

// 🔹 Todas as traduções
const translations: Record<Locale, Translations> = {
  pt: ptJson,
  en: enJson as Translations, // cast para garantir compatibilidade
  cn: cnJson as Translations,
};

// 🔹 Contexto com tipagem segura
type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof Translations) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "pt",
  setLocale: () => {},
  t: (key) => key as string,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  // 🔹 Recupera idioma salvo no localStorage
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

  // 🔹 Função de tradução tipada
  const t = (key: keyof Translations) => {
    return translations[locale][key] || translations.pt[key] || key.toString();
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 🔹 Hook para usar em qualquer componente
export const useLanguage = () => useContext(LanguageContext);
