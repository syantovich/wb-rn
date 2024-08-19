import {NavigationContainer} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

import {StackNavigation, StackScreensParamsType} from './stackNavigation';

export type RootStackParamList = NativeStackScreenProps<StackScreensParamsType>;

export default function Navigation() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}
