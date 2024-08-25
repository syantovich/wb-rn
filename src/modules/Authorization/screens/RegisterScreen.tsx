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
import {IRegisterData} from '../../../types/auth';
import useThisModuleTranslation from '../hooks/useThisModuleTranslation';
import authService from '../services/AuthService';
import registerValidationSchema from '../validation/registerValidationSchema';

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
    const {t} = useThisModuleTranslation();

    const onSubmit = async (values: IRegisterData) => {
      const {data, error} = await authService.register(values, t);
      if (error) {
        Toast.show({
          type: 'error',
          text1: t('screens.register.error'),
          text2: error,
        });
      } else {
        userStore.setAllUserInfo(data);
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
          {({handleSubmit}) => (
            <View style={[styles.formWrapper, commonStyles.maxWidth]}>
              <Text style={styles.greeting}>
                {t('screens.register.greeting')}{' '}
              </Text>
              <FormikTextInput
                name="name"
                label={t('screens.register.name')}
                left={<Icon icon="account" />}
              />
              <FormikTextInput
                name="email"
                label={t('screens.register.email')}
                left={<Icon icon="email" />}
              />
              <FormikTextInput
                name="password"
                label={t('screens.register.password')}
                secureTextEntry
                left={<Icon icon="eye" />}
              />
              <FormikTextInput
                name="confirmPassword"
                label={t('screens.register.confirmPassword')}
                secureTextEntry
                left={<Icon icon="eye" />}
              />
              <CustomButton
                style={styles.button}
                onPress={handleSubmit}
                label={t('screens.register.register')}
              />
              <CustomButton
                style={styles.button}
                onPress={() => {
                  navigation.navigate('Login');
                }}
                label={t('screens.register.login')}
              />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    );
  },
);

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    formWrapper: {
      flexDirection: 'column',
      gap: 10,
      paddingHorizontal: 20,
      columnGap: 20,
    },
    button: {marginTop: 20},
    greeting: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: theme.colors.primary,
    },
  });

export default memo(RegisterScreen);
