import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Theme from '../../../../../theme';

const ImageModal = ({ visible, hideModalHandler, imageUri }) => {
  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={visible}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ImageBackground style={styles.image} source={{ uri: imageUri }}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
              size={40}
              color={Theme.colors.primary}
              onPress={hideModalHandler}
            />
          </ImageBackground>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.lightGrey
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
    padding: 10,
    alignItems: 'flex-end'
  }
});

export default ImageModal;
