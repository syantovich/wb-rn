import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import {observer} from 'mobx-react-lite';
import ValidationScreen from '../screens/auth/ValidationScreen';
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
      <Stack.Screen name={'Validation'} component={ValidationScreen} />
      <Stack.Screen name={'Home'} component={HomeScreen} />
    </Stack.Navigator>
  );
});
