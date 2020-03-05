import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import SwiperFlatList from '../../components/SwiperFlatList';
import HomeScreen from './HomeScreen';
import ImageCaptureScreen from './ImageCaptureScreen';
import ButterflySelectionScreen from './ButterflySelectionScreen';
import StartScreen from './StartScreen';
import Colors from '../../constants/Colors';

const Guide = () => {
  return (
    <View style={styles.container}>
      <SwiperFlatList index={1} showPagination>
        <HomeScreen style={styles.child} />
        <ImageCaptureScreen style={styles.child} />
        <ButterflySelectionScreen style={styles.child} />
        <StartScreen style={styles.child} />
      </SwiperFlatList>
    </View>
  );
};

export default Guide;

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  child: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  }
});
