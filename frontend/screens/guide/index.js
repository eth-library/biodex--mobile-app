import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { ScreenOrientation } from 'expo';
import { useSelector, useDispatch } from 'react-redux';

import SwiperFlatList from '../../components/SwiperFlatList';
import HomeScreen from './HomeScreen';
import ImageCaptureScreen from './ImageCaptureScreen';
import CroppingScreen from './CroppingScreen';
import ButterflySelectionScreen from './ButterflySelectionScreen';
import StartScreen from './StartScreen';
import Theme from '../../theme';
import { hideStatusBarAction, showStatusBarAction } from '../../store/actions/statusBar';

const Guide = ({ navigation }) => {
  const hideStatusBar = useSelector((state) => state.statusBar.hidden);
  const dispatch = useDispatch();
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

  // Cleanup function on navigation
  useEffect(() => {
    dispatch(hideStatusBarAction());
    const cleanup = () => {
      dispatch(showStatusBarAction());
      navigation.addListener('blur', () => {
        dispatch(showStatusBarAction());
        ScreenOrientation.unlockAsync();
      });
    };
    return cleanup;
  }, [navigation]);

  // Adding navigation focus listener and cleanup function on unmount
  useEffect(() => {
    navigation.addListener('focus', () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      dispatch(hideStatusBarAction());
    });
    const cleanup = () => ScreenOrientation.unlockAsync();
    return cleanup;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        hidden={hideStatusBar}
        barStyle='light-content'
        backgroundColor={Theme.colors.accent}
      />
      <SwiperFlatList index={0} showPagination navigation={navigation}>
        <HomeScreen style={styles.child} />
        <ImageCaptureScreen style={styles.child} />
        <CroppingScreen style={styles.child} />
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
    flex: 1,
  },
  child: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});
