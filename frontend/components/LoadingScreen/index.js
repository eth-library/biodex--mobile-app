import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import BouncingPreloader from 'react-native-bouncing-preloader';

import Theme from '../../theme';

// to be fixed with - https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component
const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      {/* <BouncingPreloader
        icons={[
          'https://www.shareicon.net/data/256x256/2015/08/11/83747_butterfly_256x256.png',
          'https://www.shareicon.net/data/256x256/2015/08/11/83747_butterfly_256x256.png',
        ]}
      /> */}
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '10%'
  },
  text: {
    fontFamily: Theme.fonts.primary,
    fontSize: Theme.fonts.sizeS,
    marginTop: 10,
    color: Theme.colors.primary
  }
});

export default LoadingScreen;
