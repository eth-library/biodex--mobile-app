import React, { useState, useEffect, Fragment } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as ExpoImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenOrientation } from 'expo';

import Theme from '../../theme';
import butterfly from '../../assets/butterfly.jpg';
import LoadingScreen from '../../components/LoadingScreen';
import { storeSelectedImageAction, storeLocation } from '../../store/actions/images';
import { portraitStyles, landscapeStyles } from './styles';

const ImageCaptureScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
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
  let listener = null;
  // On mount
  useEffect(() => {
    listener = ScreenOrientation.addOrientationChangeListener(screenOrientationHandler);
  }, []);
  // Cleanup function on navigation
  useEffect(() => {
    const cleanup = () => {
      navigation.addListener('blur', () => {
        ScreenOrientation.removeOrientationChangeListener(listener);
      });
    };
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
  const dispatch = useDispatch();
  useEffect(() => {
    verifyLocationPermissions();
  }, []);

  // Android is asking for camera permissions on it's own. For IOS we have to ask for it at runtime.
  // This function will run once and IOS will store the result automatically.
  // Subsequent calls will return true or false based on that stored value, the user won't get asked again.
  // If the user declined permissions the first time, he will have to grant access through system settings.
  const verifyCameraPermissions = async () => {
    // Camera roll is also required on Android and ios 10 and bigger
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera and camera roll permissions to use this option.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const verifyCameraRollPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant gallery permissions to use this option.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const verifyLocationPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') return false;
    Location.getLastKnownPositionAsync()
      .then((position) => {
        dispatch(storeLocation(position));
      })
      .catch(console.log);
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyCameraPermissions();
    if (!hasPermission) {
      return;
    }
    setIsLoading(true);
    const image = await ExpoImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.4,
    });

    if (image.cancelled) {
      setIsLoading(false);
    } else {
      setTimeout(() => setIsLoading(false), 500);
      dispatch(storeSelectedImageAction(image.uri));
      navigation.navigate('ImageConfirm');
    }
  };

  const selectGalleryImageHandler = async () => {
    const hasPermission = await verifyCameraRollPermissions();
    if (!hasPermission) {
      return;
    }

    setIsLoading(true);
    const image = await ExpoImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.4,
    });

    if (image.cancelled) {
      setIsLoading(false);
    } else {
      setTimeout(() => setIsLoading(false), 500);
      dispatch(storeSelectedImageAction(image.uri));
      navigation.navigate('ImageConfirm');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Fragment>
          <StatusBar barStyle='light-content' />
          <Image style={styles.imagePreview} source={butterfly} />
          <View style={styles.bottomContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Tips</Text>
              <Text style={styles.infoText}>- capture all of the insect inside the square frame</Text>
              <Text style={styles.infoText}>- keep parts of other specimens out of the frame</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Ionicons
                name='md-camera'
                size={55}
                color={Theme.colors.accent}
                onPress={takeImageHandler}
              />
              <Ionicons
                name='md-images'
                size={55}
                color={Theme.colors.accent}
                onPress={selectGalleryImageHandler}
              />
            </View>
          </View>
        </Fragment>
      )}
    </SafeAreaView>
  );
};

export default ImageCaptureScreen;
