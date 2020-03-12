import React, { useEffect } from 'react';
import { View, Text, Button, StatusBar, Image, StyleSheet, Dimensions } from 'react-native';

import Theme from '../../theme';

const ImageCaptureConfirmationScreen = ({ navigation, route }) => {
  const imageUri = route.params.imageUri;
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <View style={styles.imagePreview}>
        <Image style={styles.image} source={{ uri: imageUri }} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button title={'Retake image'} color={Theme.colors.cancel} onPress={() => navigation.navigate('ImageCapture')} />
        <Button title={'Upload image'} color={Theme.colors.confirm} onPress={() => navigation.navigate('ButterflySelection', { imageUri: imageUri })} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  imagePreview: {
    height: Dimensions.get('window').width * 0.9,
    width: Dimensions.get('window').width * 0.9
  },
  image: {
    height: '100%',
    width: '100%'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%'
  }
});

export default ImageCaptureConfirmationScreen;
