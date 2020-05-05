import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Theme from '../../../../theme';
import imgPlaceholder from '../../../../assets/imgNotFound.png';


const ImageModal = ({ visible, hideModalHandler, imageUri }) => {
  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={visible}
      supportedOrientations={['portrait', 'landscape']}
    >

        <View style={styles.container}>
          <ImageBackground style={styles.image} source={imageUri ? { uri: imageUri } : imgPlaceholder}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
              size={40}
              color={Theme.colors.primary}
              onPress={hideModalHandler}
            />
          </ImageBackground>
        </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.lightGrey,
    padding: 10,
    overflow: 'hidden'
  },
  image: {
    width:
      Dimensions.get('window').height > Dimensions.get('window').width
        ? Dimensions.get('window').width * 0.9
        : Dimensions.get('window').height * 0.9,
    height:
      Dimensions.get('window').height > Dimensions.get('window').width
        ? Dimensions.get('window').width * 0.9
        : Dimensions.get('window').height * 0.9,
    alignItems: 'flex-end',
    paddingHorizontal: 10
  }
});

export default ImageModal;
