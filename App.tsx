import React, {FC} from 'react';
import {SafeAreaView} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';

import './src/lang';
import theme from './src/config/theme';
import Navigation from './src/navigation';
import commonStyles from './src/config/styles';

const App: FC = () => {
  return (
    <SafeAreaView style={commonStyles.fullScreen}>
      <PaperProvider theme={theme}>
        <Navigation />
        <Toast />
      </PaperProvider>
    </SafeAreaView>
  );
};

export default App;
