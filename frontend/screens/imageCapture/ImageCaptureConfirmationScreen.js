import React, { useState, useEffect } from 'react';
import { View, StatusBar, Image, StyleSheet, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenOrientation } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import Theme from '../../theme';
import Button from '../../components/Button';
import { uploadImageAsyncAction, storeLocation } from '../../store/actions/images';

const ImageCaptureConfirmationScreen = ({ navigation, route }) => {
  const [portrait, setPortrait] = useState(
    Dimensions.get('window').height > Dimensions.get('window').width
  );
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const screenOrientationHandler = () => {
    setPortrait(Dimensions.get('window').height > Dimensions.get('window').width);
    setWidth(Dimensions.get('window').width);
    setHeight(Dimensions.get('window').height);
  };
  const listener = ScreenOrientation.addOrientationChangeListener(screenOrientationHandler);
  useEffect(() => () => ScreenOrientation.removeOrientationChangeListener(listener), []);
  const styles = portrait ? portraitStyles(width, height) : landscapeStyles(width, height);
  const imageUri = route.params.imageUri;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const loc = await Location.getCurrentPositionAsync({});
      dispatch(storeLocation(loc));
    }
  };

  const confirmHandler = async () => {
    setIsLoading(true);
    await getLocationAsync();
    const response = await dispatch(uploadImageAsyncAction(imageUri));
    setIsLoading(false);
    if (response.status === 200) navigation.navigate('ButterflySelection');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' />
      <View style={styles.imagePreview}>
        <Image style={styles.image} source={{ uri: imageUri }} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title='Retake image'
          color={Theme.colors.cancel}
          onPress={() => navigation.navigate('ImageCapture')}
          isLoading={isLoading}
          style={{ width: '40%' }}
          color={Theme.colors.primary}
        />
        <Button
          title='Upload image'
          color={Theme.colors.confirm}
          onPress={confirmHandler}
          isLoading={isLoading}
          style={{ width: '40%' }}
          color={Theme.colors.accent}
        />
      </View>
    </SafeAreaView>
  );
};

const portraitStyles = (deviceWidth, deviceHeight) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    imagePreview: {
      height: deviceWidth * 0.9,
      width: deviceWidth * 0.9
    },
    image: {
      height: '100%',
      width: '100%'
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: deviceWidth * 0.9
    }
  });

const landscapeStyles = (deviceWidth, deviceHeight) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    imagePreview: {
      height: deviceHeight * 0.7,
      width: deviceHeight * 0.7
    },
    image: {
      height: '100%',
      width: '100%'
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: deviceWidth * 0.5
    }
  });

export default ImageCaptureConfirmationScreen;
