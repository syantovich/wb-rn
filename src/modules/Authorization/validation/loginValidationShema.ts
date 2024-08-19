import {TFunction} from 'i18next';
import * as Yup from 'yup';

const loginValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t('forms.validation.invalidEmail'))
      .required(t('forms.validation.required')),
    password: Yup.string()
      .min(8, t('forms.validation.password'))
      .required(t('forms.validation.required')),
  });

export default loginValidationSchema;
