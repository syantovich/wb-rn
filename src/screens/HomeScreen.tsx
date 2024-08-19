import {observer} from 'mobx-react-lite';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

import {useCommonTranslation} from '../hooks/useModuleTranslation';
import {RootStackParamList} from '../navigation';
import {userStore} from '../store';

const HomeScreen = observer(({navigation}: RootStackParamList) => {
  const {t} = useCommonTranslation();
  const user = userStore.getUser();
  console.log(user, 'USER');
  return (
    <View style={styles.container}>
      <Text>{t('screens.home.greeting')}</Text>
      <Text>{JSON.stringify(user, null, 2)}</Text>
      <Text>{user?.name}</Text>
      <Button onPress={userStore.loadUser}>
        <Text>Load</Text>
      </Button>
      {!user && (
        <>
          <Button onPress={() => navigation.navigate('Login')}>
            {t('screens.home.login')}
          </Button>
          <Button onPress={() => navigation.navigate('Register')}>
            {t('screens.home.register')}
          </Button>
        </>
      )}
      {user && !user.isVerified && (
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
