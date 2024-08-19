import {TFunction} from 'i18next';
import * as yup from 'yup';

const registerValidationSchema = (t: TFunction) =>
  yup.object().shape({
    name: yup
      .string()
      .required(t('validation.required'))
      .min(2, t('validation.min', {min: 2})),
    email: yup
      .string()
      .required(t('validation.required'))
      .email(t('validation.email')),
    password: yup
      .string()
      .required(t('validation.required'))
      .min(8, t('validation.min', {min: 8})),
    confirmPassword: yup
      .string()
      .required(t('validation.required'))
      .oneOf([yup.ref('password'), ''], t('validation.passwordMatch')),
  });

export default registerValidationSchema;
