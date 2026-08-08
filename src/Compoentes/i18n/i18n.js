import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../Locals/en.json";
import ar from "../Locals/ar.json";

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

const savedLanguage = localStorage.getItem("language") || "en";

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });


document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";

export default i18next;