import React from 'react';
import { View, Text, StatusBar, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';

import Theme from '../../theme';
import butterfly from '../../assets/butterfly.jpg';

const ImageCaptureScreen = ({ navigation }) => {
  // Android is asking for camera permissions on it's on. For IOS we have to ask for it at runtime.
  // This function will run once and IOS will store the result automatically.
  // Subsequent calls will return true or false based on that stored value, the user won't get asked again.
  // If the user declined permissions the first time, he will have to grant access through system settings.
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const image = await ExpoImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.4
    });

    navigation.navigate('ImageConfirm', { imageUri: image.uri });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <Image style={styles.imagePreview} source={butterfly} />
      <View>
        <Text style={styles.infoText}>tips:</Text>
        <Text style={styles.infoText}>capture all of the insect inside the square frame</Text>
        <Text style={styles.infoText}>keep parts of other specimens out of the frame</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Ionicons name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera' } size={40} color={Theme.colors.accent} onPress={takeImageHandler} />
        <Ionicons name={Platform.OS === 'ios' ? 'ios-images' : 'md-images' } size={40} color={Theme.colors.accent} onPress={() => console.log('open gallery')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Theme.colors.background
  },
  imagePreview: {
    height: Dimensions.get('window').width * 0.9,
    width: Dimensions.get('window').width * 0.9,
  },
  infoText: {
    fontFamily: Theme.fonts.primaryBold,
    fontSize: Theme.fonts.sizeXS,
    color: Theme.colors.primary
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%'
  }
});

export default ImageCaptureScreen;
