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
    ns: ["common", "A1"], // 新增命名空間
    defaultNS: "common", // 設定預設命名空間
  });

export function useTranslation(
  lng: string,
  ns: string | string[],
  options?: {}
) {
  const [cookies, setCookie] = useCookies([cookieName]);
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

  useEffect(() => {
    if (!runsOnServerSide) {
      // 只有在客户端环境下进行语言切换
      if (lng && i18n.resolvedLanguage !== lng) {
        i18n.changeLanguage(lng).then(() => {
          setActiveLng(lng);
          setCookie(cookieName, lng, { path: "/" });
        });
      } else if (!lng && i18n.resolvedLanguage !== activeLng) {
        setActiveLng(i18n.resolvedLanguage);
      }
    }
  }, [lng, i18n, setCookie, activeLng]);

  return ret;
}
