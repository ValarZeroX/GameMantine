import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import tw from './locales/zh-hant/common.json';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: en,
  },
  'zh-Hant': {
    translation: tw,
  },
};

i18n
  .use(LanguageDetector) // 自動偵測使用者的語言
  .use(initReactI18next)  // 初始化設定
  .init({
    resources,            // 引入定義語系與對應文字的 json 檔
    // lng: localStorage.getItem('i18nextLng') || 'zh-Hant',           // 預設語系為 en
    fallbackLng: 'zh-Hant',    // 若找不到對應語系則回傳 en
    // defaultNS: 'common',
    preload: ['en', 'zh-Hant'],
    // ns: 'common',
    interpolation: {
      escapeValue: false,
    },
    // detection: {
    //   // 設置偵測的順序，首先檢查 localStorage
    //   order: ['localStorage', 'navigator'],
    //   caches: ['localStorage'], // 將語言設置保存到 localStorage
    // },
    parseMissingKeyHandler: () => {
      return '';
    },
    react: {
      useSuspense: false
    },
  });

export default i18n;