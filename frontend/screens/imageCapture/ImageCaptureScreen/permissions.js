import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';

// Android is asking for camera permissions on it's own. For IOS we have to ask for it at runtime.
// This function will run once and IOS will store the result automatically.
// Subsequent calls will return true or false based on that stored value, the user won't get asked again.
// If the user declined permissions the first time, he will have to grant access through system settings.
export const verifyCameraPermissions = async () => {
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

export const verifyCameraRollPermissions = async () => {
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

export const verifyLocationPermissions = async () => {
  const result = await Permissions.askAsync(Permissions.LOCATION);
  return result.status === 'granted';
};
