import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import commonTtanslationIT from "/src/locales/it/common.json";
import homepageTranslationIT from "/src/locales/it/homepage.json";
import canvasTranslationIT from "/src/locales/it/canvas.json";
import commonTtanslationEN from "/src/locales/en/common.json";
import homepageTranslationEN from "/src/locales/en/homepage.json";
import canvasTranslationEN from "/src/locales/en/canvas.json";
import commonTtanslationDE from "/src/locales/de/common.json";
import homepageTranslationDE from "/src/locales/de/homepage.json";
import canvasTranslationDE from "/src/locales/de/canvas.json";
import commonTtanslationES from "/src/locales/es/common.json";
import homepageTranslationES from "/src/locales/es/homepage.json";
import canvasTranslationES from "/src/locales/es/canvas.json";
import commonTtanslationFR from "/src/locales/fr/common.json";
import homepageTranslationFR from "/src/locales/fr/homepage.json";
import canvasTranslationFR from "/src/locales/fr/canvas.json";

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
    de: {
        common: commonTtanslationDE,
        homepage: homepageTranslationDE,
        canvas: canvasTranslationDE,
    },
    es: {
        common: commonTtanslationES,
        homepage: homepageTranslationES,
        canvas: canvasTranslationES,
    },
    fr: {
        common: commonTtanslationFR,
        homepage: homepageTranslationFR,
        canvas: canvasTranslationFR,
    },
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", // Imposta inglese come lingua di default
        fallbackLng: "en",
        debug: false,
        saveMissing: true,
        detection: {
            // Configurazione del language detector
            order: ["localStorage", "navigator"], // Prima controlla localStorage, poi il browser
            caches: ["localStorage"], // Salva la preferenza in localStorage
            lookupLocalStorage: "i18nextLng", // Chiave per localStorage
        },
        missingKeyHandler: (lng, ns, key, fallbackValue) => {
            console.error(
                `Chiave di traduzione mancante: '${key}' nel namespace '${ns}' per la lingua '${lng}'`
            );
        },
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
