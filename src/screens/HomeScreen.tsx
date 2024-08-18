import {observer} from 'mobx-react-lite';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button} from 'react-native-paper';

import {RootStackParamList} from '../navigation';
import authService from '../services/AuthService';

const HomeScreen = observer(({navigation}: RootStackParamList) => {
  const {t} = useTranslation();
  console.log(authService.user, 'USER');
  return (
    <View style={styles.container}>
      <Text>{t('screens.home.greeting')}</Text>
      <Text>{JSON.stringify(authService.user, null, 2)}</Text>
      <Text>{authService.user?.name}</Text>
      <Button onPress={authService.loadUser}>
        <Text>Load</Text>
      </Button>
      {!authService.user && (
        <>
          <Button onPress={() => navigation.navigate('Login')}>
            {t('screens.home.login')}
          </Button>
          <Button onPress={() => navigation.navigate('Register')}>
            {t('screens.home.register')}
          </Button>
        </>
      )}
      {authService.user && !authService.user.isVerified && (
        <Button onPress={() => navigation.navigate('Validation')}>
          {t('screens.home.validation')}
        </Button>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
