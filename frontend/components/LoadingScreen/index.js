import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import Theme from '../../theme';

const LoadingScreen = () => {
  const hideStatusBar = useSelector((state) => state.statusBar.hidden);

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' hidden={hideStatusBar} backgroundColor={Theme.colors.accent} />
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
