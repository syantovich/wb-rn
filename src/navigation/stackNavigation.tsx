import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import React from 'react';

import LoginScreen from '../modules/Authorization/screens/LoginScreen';
import RegisterScreen from '../modules/Authorization/screens/RegisterScreen';
import ValidationScreen from '../modules/Authorization/screens/ValidationScreen';
import HomeScreen from '../screens/HomeScreen';

export type StackScreensParamsType = {
  Register: undefined;
  Login: undefined;
  Validation: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<StackScreensParamsType>();

export const StackNavigation = observer(() => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Validation" component={ValidationScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
});
