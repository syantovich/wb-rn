import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigation, StackScreensParamsType} from './stackNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = NativeStackScreenProps<StackScreensParamsType>;

export default function Navigation() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}
