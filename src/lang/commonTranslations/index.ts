import {ELanguages, LanguagesModule} from '../types';
import en from './en.json';

const commonTranslations: LanguagesModule<typeof en> = {
  [ELanguages.EN]: en,
};
export default commonTranslations;
