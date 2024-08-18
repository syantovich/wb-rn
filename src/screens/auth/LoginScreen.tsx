import React, {memo} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native';
import {Formik} from 'formik';
import {ILoginData} from '../../types/auth';
import {Button, MD3Theme, Text, TextInput, useTheme} from 'react-native-paper';
import commonStyles from '../../config/styles';
import {useTranslation} from 'react-i18next';
import loginValidationSchema from '../../config/validations/loginValidationShema';
import {observer} from 'mobx-react-lite';
import Toast from 'react-native-toast-message';
import {StackScreensParamsType} from '../../navigation/stackNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import authService from '../../services/AuthService';

const initialValues: ILoginData = {
  email: '',
  password: '',
};

const LoginScreen = observer(
  ({navigation}: NativeStackScreenProps<StackScreensParamsType>) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const {t} = useTranslation();
    const onSubmit = async (values: ILoginData) => {
      const error = await authService.login(values, t);
      if (error) {
        Toast.show({
          type: 'error',
          text1: t('screens.login.error'),
          text2: error,
        });
      }
      console.log(values);
    };

    return (
      <KeyboardAvoidingView
        style={[styles.container, commonStyles.fullScreen]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={loginValidationSchema(t)}>
          {({handleChange, handleSubmit, touched, errors}) => {
            return (
              <View style={[styles.formWrapper, commonStyles.maxWidth]}>
                <Text style={styles.greeting}>
                  {t('screens.login.greeting')}
                </Text>
                <TextInput
                  left={<TextInput.Icon icon="account" />}
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  placeholder={t('screens.login.email')}
                />
                {touched.email && errors.email && (
                  <Text style={commonStyles.errorText}>{errors.email}</Text>
                )}
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  left={<TextInput.Icon icon="eye" />}
                  onChangeText={handleChange('password')}
                  placeholder={t('screens.login.password')}
                />
                {touched.password && errors.password && (
                  <Text style={commonStyles.errorText}>{errors.password}</Text>
                )}
                <Button style={styles.button} onPress={handleSubmit}>
                  {t('screens.login.login')}
                </Button>
                <Button
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('Register');
                  }}>
                  {t('screens.login.register')}
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

export default memo(LoginScreen);
