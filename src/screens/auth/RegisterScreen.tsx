import React, {memo} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native';
import {Formik} from 'formik';
import {IRegisterData} from '../../types/auth';
import {Button, MD3Theme, Text, TextInput, useTheme} from 'react-native-paper';
import commonStyles from '../../config/styles';
import {useTranslation} from 'react-i18next';
import registerValidationSchema from '../../config/validations/registerValidationSchema';
import {observer} from 'mobx-react-lite';
import Toast from 'react-native-toast-message';
import {StackScreensParamsType} from '../../navigation/stackNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import authService from '../../services/AuthService';

const initialValues: IRegisterData = {
  email: '',
  password: '',
  name: '',
  confirmPassword: '',
};

const RegisterScreen = observer(
  ({navigation}: NativeStackScreenProps<StackScreensParamsType>) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const {t} = useTranslation();
    const onSubmit = async (values: IRegisterData) => {
      const error = await authService.register(values, t);
      if (error) {
        Toast.show({
          type: 'error',
          text1: t('screens.register.error'),
          text2: error,
        });
      } else {
        navigation.navigate('Validation');
      }
    };

    return (
      <KeyboardAvoidingView
        style={[styles.container, commonStyles.fullScreen]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={registerValidationSchema(t)}>
          {({handleChange, handleSubmit, touched, errors}) => {
            return (
              <View style={[styles.formWrapper, commonStyles.maxWidth]}>
                <Text style={styles.greeting}>
                  {t('screens.register.greeting')}
                </Text>
                <TextInput
                  left={<TextInput.Icon icon="account" />}
                  style={styles.input}
                  onChangeText={handleChange('name')}
                  placeholder={t('screens.register.name')}
                />
                {touched.name && errors.name && (
                  <Text style={commonStyles.errorText}>{errors.name}</Text>
                )}
                <TextInput
                  left={<TextInput.Icon icon="email" />}
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  placeholder={t('screens.register.email')}
                />
                {touched.email && errors.email && (
                  <Text style={commonStyles.errorText}>{errors.email}</Text>
                )}
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  left={<TextInput.Icon icon="eye" />}
                  onChangeText={handleChange('password')}
                  placeholder={t('screens.register.password')}
                />
                {touched.password && errors.password && (
                  <Text style={commonStyles.errorText}>{errors.password}</Text>
                )}
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  left={<TextInput.Icon icon="eye" />}
                  onChangeText={handleChange('confirmPassword')}
                  placeholder={t('screens.register.confirmPassword')}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={commonStyles.errorText}>
                    {errors.confirmPassword}
                  </Text>
                )}
                <Button style={styles.button} onPress={handleSubmit}>
                  {t('screens.register.register')}
                </Button>
                <Button
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  {t('screens.register.login')}
                </Button>
              </View>
            );
          }}
        </Formik>
      </KeyboardAvoidingView>
    );
  },
);

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    formWrapper: {
      flexDirection: 'column',
      gap: 10,
      paddingHorizontal: 20,
      rowGap: 20,
      columnGap: 20,
    },

    input: {
      marginBottom: 20,
    },

    button: {
      marginTop: 20,
    },
    greeting: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: theme.colors.primary,
    },
  });

export default memo(RegisterScreen);
