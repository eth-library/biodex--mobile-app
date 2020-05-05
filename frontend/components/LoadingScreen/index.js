import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';

import Theme from '../../theme';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <ActivityIndicator size='large' color={Theme.colors.primary} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
