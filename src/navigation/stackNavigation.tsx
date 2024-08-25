import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import React from 'react';

import LoginScreen from '../modules/Authorization/screens/LoginScreen';
import RegisterScreen from '../modules/Authorization/screens/RegisterScreen';
import ValidationScreen from '../modules/Authorization/screens/ValidationScreen';
import HomeScreen from '../screens/HomeScreen';
import {userStore} from '../store';

export type StackScreensParamsType = {
  Register: undefined;
  Login: undefined;
  Validation: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<StackScreensParamsType>();

export const StackNavigation = observer(() => {
  const user = userStore.getUser();
  const isAuthorized = !!user;
  const isVerified = user?.isVerified;

  return (
    <Stack.Navigator initialRouteName="Home">
      {!isAuthorized && (
        <>
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}

      {isAuthorized && !isVerified && (
        <Stack.Screen name="Validation" component={ValidationScreen} />
      )}

      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
});
