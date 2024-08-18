import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {RootStackParamList} from '../../navigation';
import Toast from 'react-native-toast-message';
import validationUserCodeSchema from '../../config/validations/validationUserCodeSchema';
import authService from '../../services/AuthService';

const initialValues = {
  code: '',
};

const ValidationScreen = ({navigation}: RootStackParamList) => {
  const {t} = useTranslation();

  const onSubmit = async (values: typeof initialValues) => {
    const error = await authService.validateVerificationCode(values.code, t);
    if (error) {
      Toast.show({
        type: 'error',
        text1: t('screens.validation.error'),
        text2: error,
      });
    } else {
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    const onError = (error: string) => {
      Toast.show({
        type: 'error',
        text1: t('screens.validation.error'),
        text2: error,
      });
    };
    authService.sendVerificationCode(onError, t);
  }, [t]);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationUserCodeSchema(t)}>
        {({handleChange, handleSubmit, touched, errors}) => (
          <View style={styles.formWrapper}>
            <Text style={styles.greeting}>
              {t('screens.validation.greeting')}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('code')}
              placeholder={t('screens.validation.code')}
            />
            {touched.code && errors.code && (
              <Text style={styles.errorText}>{errors.code}</Text>
            )}
            <Button style={styles.button} onPress={handleSubmit}>
              {t('screens.validation.submit')}
            </Button>
          </View>
        )}
      </Formik>
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
  input: {
    marginBottom: 20,
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

export default ValidationScreen;
