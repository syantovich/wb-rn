export enum ELanguages {
  EN = 'en',
}

export type LanguageTranslation<T extends object = object> = T;

export type LanguagesModule<T extends object = object> = {
  [key in ELanguages]: LanguageTranslation<T>;
};
