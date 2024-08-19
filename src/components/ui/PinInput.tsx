import React, {useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

interface PinInputProps {
  length: number;
  onChange: (pin: string) => void;
  value: string;
  style?: object;
  placeholder?: string;
}

const PinInput: React.FC<PinInputProps> = ({
  length,
  onChange,
  value,
  style,
  placeholder,
}) => {
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newPin = inputs.current
      .map((input, i) => (i === index ? text : input?.props.value))
      .join('');
    onChange(newPin);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (
      e.nativeEvent.key === 'Backspace' &&
      index > 0 &&
      !inputs.current[index]?.props.value
    ) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = async () => {
    const pastedText = await Clipboard.getString();
    if (/^\d+$/.test(pastedText) && pastedText.length === length) {
      pastedText.split('').forEach((char: string, i: number) => {
        if (inputs.current[i]) {
          inputs.current[i]?.setNativeProps({text: char});
        }
      });
      onChange(pastedText);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {Array.from({length}).map((_, index) => (
        <TextInput
          key={index}
          ref={ref => (inputs.current[index] = ref)}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          onFocus={handlePaste}
          value={value[index] || ''}
          placeholder={placeholder}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    width: 40,
    height: 40,
  },
});

export default PinInput;
