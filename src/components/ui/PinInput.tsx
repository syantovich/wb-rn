import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
} from 'react-native';

export interface PinInputProps {
  length: number;
  onChange: (pin: string) => void;
  values: (string | number)[];
  style?: object;
  placeholder?: string;
  onFullPin?: (pin: string) => void;
}

const PinInput: React.FC<PinInputProps> = ({
  length,
  onChange,
  values,
  style,
  placeholder,
  onFullPin,
}) => {
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newPin = values
      .map((char, i) => (i === index ? text : char))
      .join('');
    onChange(newPin);

    if (newPin.length === length) {
      onFullPin?.(newPin);
    }

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    const handlePaste = async () => {
      const pastedText = await Clipboard.getString();
      if (/^\d+$/.test(pastedText) && pastedText.length === length) {
        onChange(pastedText);
      }
    };
    handlePaste();
  }, [length, onChange]);

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
          value={`${values[index] || ''}`}
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
    height: 50,
    borderRadius: 15,
  },
});

export default PinInput;
