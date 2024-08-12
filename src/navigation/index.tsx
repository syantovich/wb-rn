import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigation} from './stackNavigation';

export default function Navigation() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}
