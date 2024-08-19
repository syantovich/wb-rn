import React from 'react';
import {Button, ButtonProps, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';

interface CustomButtonProps extends Omit<ButtonProps, 'children'> {
  label: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  style,
  ...props
}) => {
  return (
    <Button mode="contained" style={[styles.button, style]} {...props}>
      <Text>{label}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default CustomButton;
