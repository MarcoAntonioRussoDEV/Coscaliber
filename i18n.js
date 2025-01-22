import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import commonTtanslationIT from "/src/locales/it/common.json";
import homepageTranslationIT from "/src/locales/it/homepage.json";
import canvasTranslationIT from "/src/locales/it/canvas.json";
import commonTtanslationEN from "/src/locales/en/common.json";
import homepageTranslationEN from "/src/locales/en/homepage.json";
import canvasTranslationEN from "/src/locales/en/canvas.json";

const resources = {
    en: {
        common: commonTtanslationEN,
        homepage: homepageTranslationEN,
        canvas: canvasTranslationEN,
    },
    it: {
        common: commonTtanslationIT,
        homepage: homepageTranslationIT,
        canvas: canvasTranslationIT,
    },
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        debug: false,
        ns: ["common", "homepage", "canvas"], // Definisci i namespace
        defaultNS: "common", // Namespace di default
        backend: {
            loadPath: "@locales/{{lng}}/{{ns}}.json", // Percorso per caricare i file di traduzione
        },
        interpolation: {
            escapeValue: false, // React già di per sé fa l'escaping
        },
    });

export default i18n;
