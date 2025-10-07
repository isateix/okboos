// src/context/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Locale = "pt" | "en" | "cn";

type LanguageContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const translations: Record<Locale, Record<string, string>> = {
  pt: {
    deliver: "Entregar",
    offers: "Ofertas do Dia",
    lists: "Minhas listas",
    vouchers: "Vales-presente",
    support: "Atendimento ao Cliente",
    sell: "Vender",
    searchPlaceholder: "Pesquisar produtos...",
    cart: "Carrinho",
    orders: "Pedidos",
    ordersReturns: "& Devoluções",
    helloLogin: "Olá, entrar",
    continueWithGoogle: "Continuar com Google",
    welcome: "Bem-vindo! Faça login para continuar",
    createAccount: "Criar conta OkBoss",
    register: "Registrar",
    continueArrow: "Continuar →",
    noAccount: "Não tem uma conta?",
    signUp: "Cadastre-se",
    startHere: "Comece aqui",
  },
  en: {
    deliver: "Deliver",
    offers: "Deals of the Day",
    lists: "My lists",
    vouchers: "Gift cards",
    support: "Customer Support",
    sell: "Sell",
    searchPlaceholder: "Search products...",
    cart: "Cart",
    orders: "Orders",
    ordersReturns: "& Returns",
    helloLogin: "Hi, sign in",
    continueWithGoogle: "Continue with Google",
    welcome: "Welcome! Sign in to continue",
    createAccount: "Create an account",
    register: "Register",
    continueArrow: "Continue →",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    startHere: "Start here",
  },
  cn: {
    deliver: "送货",
    offers: "今日特惠",
    lists: "我的清单",
    vouchers: "礼品卡",
    support: "客户服务",
    sell: "出售",
    searchPlaceholder: "搜索商品...",
    cart: "购物车",
    orders: "订单",
    ordersReturns: "与 退货",
    helloLogin: "你好，登录",
    continueWithGoogle: "使用 Google 继续",
    welcome: "欢迎！请登录继续",
    createAccount: "创建账户",
    register: "注册",
    continueArrow: "继续 →",
    noAccount: "还没有账户？",
    signUp: "注册",
    startHere: "开始",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "pt",
  setLocale: () => {},
  t: (k: string) => k,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("locale")) as
      | Locale
      | null;
    if (saved && ["pt", "en", "cn"].includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") localStorage.setItem("locale", l);
  };

  const t = (key: string) => translations[locale][key] ?? translations["pt"][key] ?? key;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
