import {useField} from 'formik';
import React from 'react';

import PinInput from '../ui/PinInput';

interface FormikPinInputProps {
  name: string;
  length: number;
  style?: object;
  placeholder?: string;
}

const FormikPinInput: React.FC<FormikPinInputProps> = ({
  name,
  length,
  style,
  placeholder,
}) => {
  const [field, , helpers] = useField(name);

  const handleChange = (pin: string) => {
    helpers.setValue(pin);
  };

  return (
    <PinInput
      length={length}
      onChange={handleChange}
      value={field.value}
      style={style}
      placeholder={placeholder}
    />
  );
};

export default FormikPinInput;
