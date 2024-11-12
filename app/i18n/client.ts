//app/i18n/routes.ts
"use client";


import { useEffect, useState } from "react";
import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import { useCookies } from "react-cookie";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions, languages, cookieName } from "./settings";

const runsOnServerSide = typeof window === "undefined";

//
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (lng: string, ns: string) => import(`./locales/${lng}/${ns}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
  });

  export function useTranslation(lng: string, ns: string, options?: {}) {
    const [cookies, setCookie] = useCookies([cookieName]);
    const ret = useTranslationOrg(ns, options);
    const { i18n } = ret;
  
    // 如果在服务端渲染时，直接设置语言
    if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng);
    } else {
      // 客户端环境
      const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);
  
      useEffect(() => {
        // 当 activeLng 与 resolvedLanguage 不一致时才更新
        if (activeLng !== i18n.resolvedLanguage) {
          setActiveLng(i18n.resolvedLanguage);
        }
      }, [i18n.resolvedLanguage]);
  
      useEffect(() => {
        // 当 lng 与当前语言不一致时才更改语言
        if (lng && i18n.resolvedLanguage !== lng) {
          i18n.changeLanguage(lng).then(() => {
            setActiveLng(lng);
            setCookie(cookieName, lng, { path: "/" });
          });
        }
      }, [lng, i18n, setCookie]);
    }
  
    return ret;
  }