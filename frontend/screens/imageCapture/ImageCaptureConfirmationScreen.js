import React from 'react';
import { View, Button, StatusBar } from 'react-native';

const ImageCaptureConfirmationScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle='light-content' />
      <Button onPress={() => navigation.navigate('ButterflySelection')} title='Go to selection' />
    </View>
  );
};

export default ImageCaptureConfirmationScreen;
