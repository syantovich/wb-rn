import en from './en.json';
import {ELanguages, LanguagesModule} from '../types';

const commonTranslations: LanguagesModule<typeof en> = {
  [ELanguages.EN]: en,
};
export default commonTranslations;
