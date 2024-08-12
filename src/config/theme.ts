import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import {DefaultTheme} from 'react-native-paper';

const theme: ThemeProp = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default theme;
