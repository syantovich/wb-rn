import {DefaultTheme} from 'react-native-paper';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';

const theme: ThemeProp = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default theme;
