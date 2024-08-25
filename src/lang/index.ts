import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import combinedTranslations from './translations';
import {ELanguages, LanguageTranslation} from './types';

const languages = [{code: ELanguages.EN, name: 'English'}];

const languagesCodes = Object.keys(ELanguages) as ELanguages[];

const resources = languagesCodes.reduce(
  (acc: {[key: string]: {translation: LanguageTranslation}}, originalCode) => {
    const code = originalCode.toLowerCase() as ELanguages;
    acc[code] = {
      translation: combinedTranslations[code],
    };
    return acc;
  },
  {} as {[key: string]: {translation: LanguageTranslation}},
);

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
});

export default {i18n, languages};
