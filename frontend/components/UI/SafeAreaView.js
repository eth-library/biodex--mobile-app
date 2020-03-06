import React from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const SafeAreaView = props => {
  return <View style={{ ...styles.container, ...props.style }}>{props.children}</View>
};

const styles = {
  container: {
  width: Dimensions.get('window').width,
  ...Platform.select({
    // heights based on https://stackoverflow.com/questions/46376860/what-is-the-safe-region-for-iphone-x-in-pixels-that-factors-the-top-notch-an
    ios: {
      height: getStatusBarHeight() === 20 ? Dimensions.get('window').height - getStatusBarHeight() : Dimensions.get('window').height - getStatusBarHeight() - 34
    },
    // On android if the status bar is small (24), Dimensions.get('window).height returns the height including that bar. If the status bar has a notch, it is calculated properly
    android: {
      height: getStatusBarHeight() === 24 ? Dimensions.get('window').height - 24 : Dimensions.get('window').height,
    }
  }),
  top: getStatusBarHeight(),
  backgroundColor: 'orange'
}};

export default SafeAreaView;
