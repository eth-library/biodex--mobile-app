import React from 'react';
import { View, Button, Image, StatusBar, StyleSheet, Dimensions } from 'react-native';

const ButterflySelectionScreen = ({ navigation, route }) => {
  const imageUri = route.params.imageUri;

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <View style={styles.imagePreview}>
        <Image style={styles.image} source={{ uri: imageUri }} />
      </View>
      <Button onPress={() => navigation.navigate('ImageCapture')} title='Go back to Home' />
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

export default ButterflySelectionScreen;
