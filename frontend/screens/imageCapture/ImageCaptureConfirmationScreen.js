import React, { useState, useEffect } from 'react';
import { View, StatusBar, Image, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenOrientation } from 'expo';

import Theme from '../../theme';
import Button from '../../components/Button';
import { getPredictionsAsyncAction, newCaseAsyncAction } from '../../store/actions/images';

const ImageCaptureConfirmationScreen = ({ navigation }) => {
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
  // Cleanup function on navigation
  useEffect(() => {
    const cleanup = navigation.addListener('blur', () => {
      ScreenOrientation.removeOrientationChangeListener(listener);
    });
    return cleanup;
  }, [navigation]);
  // Cleanup function on unmount
  useEffect(() => {
    const cleanup = () => {
      ScreenOrientation.removeOrientationChangeListener(listener);
    };
    return cleanup;
  }, []);
  const styles = portrait ? portraitStyles(width, height) : landscapeStyles(width, height);
  const imageUri = useSelector((state) => state.images.selectedImage);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const confirmHandler = async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(getPredictionsAsyncAction(imageUri));
      if (response && response.ok) {
        try {
          const db_response = await dispatch(newCaseAsyncAction(response.data, imageUri));
          if (db_response.ok) navigation.navigate('ButterflySelection');
        } catch (e) {
          setIsLoading(false);
          console.log('ERROR IN ImageCaptureConfirmationScreen', e.message);
        }
      } else {
        console.log('ERROR IN ImageCaptureConfirmationScreen - second', JSON.stringify(response));
      }
    } catch (e) {
      console.log('ERROR IN ImageCaptureConfirmationScreen - third', e.message);
    }
    setIsLoading(false);
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
          style={styles.button}
          color={Theme.colors.primary}
        />
        <Button
          title='Upload image'
          color={Theme.colors.confirm}
          onPress={confirmHandler}
          isLoading={isLoading}
          style={styles.button}
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
      justifyContent: 'space-around',
    },
    imagePreview: {
      height: deviceWidth * 0.9,
      width: deviceWidth * 0.9,
      borderWidth: 1,
      borderStyle: 'solid',
    },
    image: {
      height: '100%',
      width: '100%',
    },
    button: {
      width: '40%',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: deviceWidth * 0.9,
    },
  });

const landscapeStyles = (deviceWidth, deviceHeight) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    imagePreview: {
      height: deviceHeight * 0.7,
      width: deviceHeight * 0.7,
    },
    image: {
      height: '100%',
      width: '100%',
    },
    button: {
      width: '20%',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: deviceWidth * 0.9,
      position: 'absolute',
      bottom: 30,
    },
  });

export default ImageCaptureConfirmationScreen;
