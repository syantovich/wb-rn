import {useTranslation} from 'react-i18next';

export const useTranslationHook = () => {
  const {t} = useTranslation();
  return t;
};
