import {useField} from 'formik';
import React from 'react';

import TextInput, {TextInputProps} from '../ui/TextInput';

interface FormikTextInputProps
  extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  name: string;
  label: string;

  [key: string]: any;
}

const FormikTextInput: React.FC<FormikTextInputProps> = ({
  name,
  label,
  ...props
}) => {
  const [field, meta] = useField(name);
  const error = meta.touched && meta.error ? meta.error : undefined;

  return (
    <TextInput
      label={label}
      value={field.value}
      onChangeText={field.onChange(name)}
      onBlur={field.onBlur(name)}
      error={!!error}
      errorMessage={error}
      {...props}
    />
  );
};

export default FormikTextInput;
