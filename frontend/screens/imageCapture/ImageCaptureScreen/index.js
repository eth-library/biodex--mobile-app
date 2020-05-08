import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import * as ExpoImagePicker from 'expo-image-picker';

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenOrientation } from 'expo';

import Theme from '../../../theme';
import butterfly from '../../../assets/butterfly.jpg';
import LoadingScreen from '../../../components/LoadingScreen';
import ImageCropper from '../../../components/ImageCropper';
import { getPredictionsAsyncAction, storeLocation, newCaseAsyncAction, storeImageTakingMethod } from '../../../store/actions/images';
import { networkErrorAsyncAction } from '../../../store/actions/network';
import { hideStatusBarAction, showStatusBarAction } from '../../../store/actions/statusBar';
import { portraitStyles, landscapeStyles } from './styles';
import { verifyCameraPermissions, verifyCameraRollPermissions, verifyLocationPermissions } from './permissions';

const ImageCaptureScreen = ({ navigation, route, portrait, width, height }) => {
  const [cropModalVisible, setCropModalVisible] = useState(false);
  const [uri, setUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const hideStatusBar = useSelector((state) => state.statusBar.hidden);
  const picMethod = useSelector((state) => state.images.picMethod)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const method = route.params && route.params.method ? route.params.method : null;
      retakeImageHandler(method);
    });
    return unsubscribe;
  }, [navigation, route]);

  const styles = portrait ? portraitStyles(width, height) : landscapeStyles(width, height);
  const dispatch = useDispatch();
  
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const hasPermission = await verifyLocationPermissions();
    if (!hasPermission) return
    Location.getLastKnownPositionAsync()
    .then((position) => {
      dispatch(storeLocation(position));
    })
    .catch(console.log);
  };

  const retakeImageHandler = (method) => {
    console.log('RETAKE', method)
    if (method === 'camera') {
      takeCameraImageHandler();
    } else if (method === 'gallery') {
      selectGalleryImageHandler();
    }
  };

  const takeCameraImageHandler = async () => {
    const hasPermission = await verifyCameraPermissions();
    if (!hasPermission) return;

    dispatch(storeImageTakingMethod('camera'));
    setIsLoading(true);
    dispatch(hideStatusBarAction());

    const image = await ExpoImagePicker.launchCameraAsync({
      quality: 0.4,
    });

    if (image.cancelled) {
      setIsLoading(false);
      dispatch(showStatusBarAction());
    } else {
      setUri(image.uri);
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      dispatch(hideStatusBarAction());
      setCropModalVisible(true);
    }
  };

  const selectGalleryImageHandler = async () => {
    const hasPermission = await verifyCameraRollPermissions();
    if (!hasPermission) return;

    dispatch(storeImageTakingMethod('gallery'));
    setIsLoading(true);
    dispatch(hideStatusBarAction());
    console.log('LAUNCH')
    const image = await ExpoImagePicker.launchImageLibraryAsync({
      quality: 0.4,
    });
    console.log('image', image)

    if (image.cancelled) {
      setIsLoading(false);
      dispatch(showStatusBarAction());
    } else {
      setUri(image.uri);
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      setCropModalVisible(true);
    }
  };

  const storeCroppedImageHandler = async (uri) => {
    setCropModalVisible(!cropModalVisible)
    await ScreenOrientation.unlockAsync();
    dispatch(showStatusBarAction());
    try {
      const response = await dispatch(getPredictionsAsyncAction(uri));
      if (response && response.ok) {
        try {
          const db_response = await dispatch(newCaseAsyncAction(response.data, uri));
          if (db_response.ok) navigation.navigate('ButterflySelection');
        } catch (e) {
          dispatch(networkErrorAsyncAction())
          console.log('ERROR IN storeCroppedImageHandler', e.message);
        }
      } else {
        dispatch(networkErrorAsyncAction())
        console.log('ERROR IN storeCroppedImageHandler - second', JSON.stringify(response));
      }
    } catch (e) {
      dispatch(networkErrorAsyncAction())
      console.log('ERROR IN storeCroppedImageHandler - third', e.message);
    }
  };

  const cancelHandler = async () => {
    setIsLoading(true);
    setCropModalVisible(!cropModalVisible);
    await ScreenOrientation.unlockAsync();
    retakeImageHandler(picMethod);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <LoadingScreen statusBarHidden={hideStatusBar}/>
      ) : (
        <Fragment>
          <StatusBar barStyle='light-content' hidden={hideStatusBar} backgroundColor={Theme.colors.accent} />
          <Image style={styles.imagePreview} source={butterfly} />
          <View style={styles.bottomContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Tips</Text>
              <Text style={styles.infoText}>- capture all of the insect inside the square frame</Text>
              <Text style={styles.infoText}>- keep parts of other specimens out of the frame</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
                size={55}
                color={Theme.colors.accent}
                onPress={takeCameraImageHandler}
              />
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-images' : 'md-images'}
                size={Platform.OS === 'ios' ? 50 : 55}
                color={Theme.colors.accent}
                onPress={selectGalleryImageHandler}
              />
            </View>
          </View>
        </Fragment>
      )}
      {cropModalVisible && (
        <ImageCropper
          photo={{ uri }}
          isVisible={cropModalVisible}
          chosenPicture={(data) => storeCroppedImageHandler(data.uri)}
          onToggleModal={() => setCropModalVisible(!cropModalVisible)}
          onCancel={cancelHandler}
          saveOptions={{
            compress: 1,
            format: 'jpeg',
            base64: true,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default ImageCaptureScreen;
