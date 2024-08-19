import {TFunction} from 'i18next';
import * as yup from 'yup';

const validationUserCodeSchema = (t: TFunction) =>
  yup.object().shape({
    code: yup
      .string()
      .required(t('validation.required'))
      .length(8, t('validation.length', {length: 8})),
  });

export default validationUserCodeSchema;
