import React, {memo} from 'react';
import {
  TextInput as PaperTextInput,
  TextInputProps as PaperTextInputProps,
  Text,
} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

export interface TextInputProps
  extends Omit<PaperTextInputProps, 'onChangeText'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
  errorMessage?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChangeText,
  error,
  errorMessage,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <PaperTextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        error={error}
        style={styles.input}
        {...rest}
      />
      {error && errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    maxWidth: 400,
    width: '100%',
  },
  input: {
    height: 50,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default memo(TextInput);
