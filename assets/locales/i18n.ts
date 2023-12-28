import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import ar from './ar/translation.json';
import zh from './zh/translation.json';
import sq from './sq/translation.json';
import fr from './fr/translation.json';
import en from './en/translation.json';
import hi from './hi/translation.json';
import ur from './ur/translation.json';
import tr from './tr/translation.json';

const resources = {
  ar: {
    translation: ar,
  },
  zh: {
    translation: zh,
  },
  sq: {
    translation: sq,
  },
  fr: {
    translation: fr,
  },
  en: {
    translation: en,
  },
  hi: {
    translation: hi,
  },
  ur: {
    translation: ur,
  },
  tr: {
    translation: tr,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en', // RNLocalize.getLocales()[0].languageCode,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
