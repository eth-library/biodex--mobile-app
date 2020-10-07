import { useIsFocused } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect } from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SwiperFlatList from '../../components/SwiperFlatList';
import { hideStatusBarAction, showStatusBarAction } from '../../store/actions/statusBar';
import Theme from '../../theme';
import ButterflySelectionScreen from './ButterflySelectionScreen';
import CroppingScreen from './CroppingScreen';
import HomeScreen from './HomeScreen';
import ImageCaptureScreen from './ImageCaptureScreen';
import StartScreen from './StartScreen';
import InviteUsersScreen from './InviteUsersScreen'

const Guide = ({ navigation }) => {
  const statusBar = useSelector((state) => state.statusBar);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

  // Cleanup function on navigation
  useEffect(() => {
    // When clicking on home, it resets the image capture stack and remounts the guide stack. 
    // If the guide stack is not focused, it should not hide the statusbar
    if (isFocused) dispatch(hideStatusBarAction());
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
      <StatusBar barStyle={statusBar.color} hidden={statusBar.hidden} backgroundColor={Theme.colors.accent} />
      <SwiperFlatList index={0} showPagination navigation={navigation}>
        <HomeScreen style={styles.child} />
        <ImageCaptureScreen style={styles.child} />
        <CroppingScreen style={styles.child} />
        <ButterflySelectionScreen style={styles.child} />
        <InviteUsersScreen style={styles.child} />
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
