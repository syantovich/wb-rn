import {useField} from 'formik';
import React from 'react';

import PinInput, {PinInputProps} from '../ui/PinInput';

interface FormikPinInputProps {
  name: string;
  length: number;
  style?: object;
  placeholder?: string;
  onFullPin?: (pin: string) => void;
}

const FormikPinInput: React.FC<
  FormikPinInputProps & Omit<PinInputProps, 'onChange' | 'values'>
> = ({name, length, style, placeholder, ...props}) => {
  const [field, , helpers] = useField(name);

  const values = new Array(length).fill('').map((_, i) => field.value[i] || '');
  return (
    <PinInput
      length={length}
      onChange={helpers.setValue}
      values={values}
      style={style}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default FormikPinInput;
