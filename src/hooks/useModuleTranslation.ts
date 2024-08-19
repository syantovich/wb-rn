import {TFunction} from 'i18next';
import {useTranslation} from 'react-i18next';

import {commonTranslationModuleName} from '../constants/config';

const useModuleTranslation = (moduleName: string): {t: TFunction} => {
  const {t} = useTranslation();
  return {
    t: ((key: string, options?: any) =>
      t(`${moduleName}.${key}`, options)) as TFunction,
  };
};

export const useCommonTranslation = () =>
  useModuleTranslation(commonTranslationModuleName);

export default useModuleTranslation;
