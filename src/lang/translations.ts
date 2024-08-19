import commonTranslations from './commonTranslations';
import {ELanguages, LanguagesModule} from './types';
import {commonTranslationModuleName} from '../constants/config';
import {modules} from '../constants/modules';

const translationsByModules: {[key: string]: LanguagesModule} = modules.reduce(
  (acc: {[key: string]: LanguagesModule}, {moduleName, translations}) => {
    acc[moduleName] = translations;
    return acc;
  },
  {},
);

translationsByModules[commonTranslationModuleName] = commonTranslations;

const combinedTranslations: {
  [key in ELanguages]: {
    [moduleName in keyof typeof translationsByModules]: object;
  };
} = Object.keys(translationsByModules).reduce(
  (acc, key) => {
    const moduleKey = key as keyof typeof translationsByModules;
    const moduleTranslations = translationsByModules[moduleKey];
    Object.keys(moduleTranslations).forEach(languageKey => {
      const langKey = languageKey as ELanguages;
      if (!acc[langKey]) {
        acc[langKey] = {} as {
          [moduleName in keyof typeof translationsByModules]: object;
        };
      }
      acc[langKey][moduleKey] = moduleTranslations[langKey];
    });
    return acc;
  },
  {} as {
    [key in ELanguages]: {
      [moduleName in keyof typeof translationsByModules]: object;
    };
  },
);

export default combinedTranslations;
