import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  TextInput as PaperTextInput,
  TextInputProps as PaperTextInputProps,
  Text,
} from 'react-native-paper';

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
    <View style={[styles.container]}>
      <PaperTextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        error={error}
        {...rest}
        style={styles.input}
      />
      {error && errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
    width: '100%',
    minHeight: 80,
    marginBottom: 5,
  },
  input: {
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
  },
});

export default memo(TextInput);
