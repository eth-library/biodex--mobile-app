import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ScreenOrientation } from 'expo';

import SwiperFlatList from '../../components/SwiperFlatList';
import HomeScreen from './HomeScreen';
import ImageCaptureScreen from './ImageCaptureScreen';
import ButterflySelectionScreen from './ButterflySelectionScreen';
import StartScreen from './StartScreen';
import Theme from '../../theme';

const Guide = ({ navigation }) => {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

  return (
    <View style={styles.container}>
      <SwiperFlatList index={0} showPagination navigation={navigation} >
        <HomeScreen style={styles.child} />
        <ImageCaptureScreen style={styles.child} />
        <ButterflySelectionScreen style={styles.child} />
        <StartScreen style={styles.child} navigation={navigation} />
      </SwiperFlatList>
    </View>
  );
};

export default Guide;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  child: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  }
});
