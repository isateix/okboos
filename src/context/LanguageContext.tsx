"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Locale = "pt" | "en" | "cn";

const translations = {
  pt: {
    companySubtitle: "Comércio e Serviços",
    searchPlaceholder: "Pesquisar produtos...",
    offers: "Ofertas do Dia",
    lists: "Minhas listas",
    vouchers: "Vales-presente",
    support: "Atendimento ao Cliente",
    sell: "Vender",
    login: "Olá, entrar",
    logout: "Sair",
    cart: "Carrinho",
  },
  en: {
    companySubtitle: "Commerce & Services",
    searchPlaceholder: "Search products...",
    offers: "Today's Deals",
    lists: "My Lists",
    vouchers: "Gift Cards",
    support: "Customer Support",
    sell: "Sell",
    login: "Hello, Sign in",
    logout: "Logout",
    cart: "Cart",
  },
  cn: {
    companySubtitle: "商业与服务",
    searchPlaceholder: "搜索产品...",
    offers: "今日优惠",
    lists: "我的清单",
    vouchers: "礼品卡",
    support: "客户服务",
    sell: "出售",
    login: "你好，登录",
    logout: "退出",
    cart: "购物车",
  },
};

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof typeof translations["pt"]) => string;
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

  const t = (key: keyof typeof translations["pt"]) => {
    return translations[locale][key] || translations.pt[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
