import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import {observer} from 'mobx-react-lite';
import React, {memo} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native';
import {MD3Theme, Text, useTheme} from 'react-native-paper';
import Toast from 'react-native-toast-message';

import FormikTextInput from '../../../components/formik/FormikTextInput';
import CustomButton from '../../../components/ui/CustomButton';
import Icon from '../../../components/ui/Icon';
import commonStyles from '../../../config/styles';
import {StackScreensParamsType} from '../../../navigation/stackNavigation';
import {userStore} from '../../../store';
import {ILoginData} from '../../../types/auth';
import useThisModuleTranslation from '../hooks/useThisModuleTranslation';
import authService from '../services/AuthService';
import loginValidationSchema from '../validation/loginValidationShema';

const initialValues: ILoginData = {
  email: '',
  password: '',
};

const LoginScreen = observer(
  ({navigation}: NativeStackScreenProps<StackScreensParamsType>) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const {t} = useThisModuleTranslation();
    const onSubmit = async (values: ILoginData) => {
      const {error, data} = await authService.login(values, t);
      if (error) {
        Toast.show({
          type: 'error',
          text1: t('screens.login.error'),
          text2: error,
        });
      } else {
        userStore.setAllUserInfo(data);
      }
    };

    return (
      <KeyboardAvoidingView
        style={[styles.container, commonStyles.fullScreen]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={loginValidationSchema(t)}>
          {({handleSubmit}) => {
            return (
              <View style={[styles.formWrapper, commonStyles.maxWidth]}>
                <Text style={styles.greeting}>
                  {t('screens.login.greeting')}
                </Text>
                <FormikTextInput
                  name="email"
                  label={t('screens.login.email')}
                  left={<Icon icon="account" />}
                />
                <FormikTextInput
                  name="password"
                  label={t('screens.login.password')}
                  secureTextEntry
                  left={<Icon icon="eye" />}
                />
                <CustomButton
                  style={styles.button}
                  onPress={handleSubmit}
                  label={t('screens.login.login')}
                />
                <CustomButton
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('Register');
                  }}
                  label={t('screens.login.register')}
                />
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
      paddingHorizontal: 10,
      gap: 0,
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
