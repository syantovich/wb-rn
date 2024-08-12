import {Dimensions, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    width: windowWidth,
    height: windowHeight,
  },
  maxWidth: {
    width: '100%',
    maxWidth: 400,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default commonStyles;
