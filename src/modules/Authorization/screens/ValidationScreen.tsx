import {Formik} from 'formik';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Toast from 'react-native-toast-message';

import FormikPinInput from '../../../components/formik/FormikPinInput';
import CustomButton from '../../../components/ui/CustomButton';
import useEffectOnRender from '../../../hooks/useEffectOnRender';
import {RootStackParamList} from '../../../navigation';
import {userStore} from '../../../store';
import useThisModuleTranslation from '../hooks/useThisModuleTranslation';
import authService from '../services/AuthService';
import validationUserCodeSchema from '../validation/validationUserCodeSchema';

const initialValues = {
  code: '',
};

const ValidationScreen = ({navigation}: RootStackParamList) => {
  const {t} = useThisModuleTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const sendCode = useCallback(async () => {
    setIsLoading(true);
    try {
      const onError = (error: string) => {
        Toast.show({
          type: 'error',
          text1: t('screens.validation.error'),
          text2: error,
        });
      };
      const user = userStore.getUser();
      authService.sendVerificationCode(user?.id, onError, t);
      Toast.show({
        type: 'success',
        text1: t('screens.validation.successSent'),
      });
    } catch (e) {}
    setIsLoading(false);
  }, [t]);

  const onSubmit = useCallback(
    async (values: typeof initialValues) => {
      const {error} = await authService.validateVerificationCode(
        values.code,
        t,
      );
      if (error) {
        Toast.show({
          type: 'error',
          text1: t('screens.validation.error'),
          text2: error,
        });
      } else {
        userStore.verifyUser();
        navigation.navigate('Home');
      }
    },
    [navigation, t],
  );
  const onFullPin = useCallback(
    (value: string) => {
      onSubmit({code: value});
    },
    [onSubmit],
  );

  useEffectOnRender(sendCode);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationUserCodeSchema(t)}>
        {({handleSubmit, touched, errors}) => (
          <View style={styles.formWrapper}>
            <Text style={styles.greeting}>
              {t('screens.validation.greeting')}
            </Text>
            <FormikPinInput length={6} name="code" onFullPin={onFullPin} />
            {touched.code && errors.code && (
              <Text style={styles.errorText}>{errors.code}</Text>
            )}
            <CustomButton
              style={styles.button}
              onPress={handleSubmit}
              loading={isLoading}
              label={t('screens.validation.submit')}
            />

            <CustomButton
              style={styles.button}
              onPress={sendCode}
              loading={isLoading}
              label={t('screens.validation.resend')}
            />
          </View>
        )}
      </Formik>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    width: '80%',
  },
  button: {
    marginTop: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default observer(ValidationScreen);
