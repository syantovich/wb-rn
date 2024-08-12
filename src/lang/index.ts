import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './translations/en.json';

type Translations = typeof en;

const languages = [{code: 'en', name: 'English'}];

const languagesCodes = languages.map(({code}) => code);

const resources = languagesCodes.reduce(
  (acc: {[key: string]: {translation: Translations}}, code) => {
    acc[code] = {translation: en};
    return acc;
  },
  {} as {[key: string]: {translation: Translations}},
);

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
});

export default {i18n, languages};
