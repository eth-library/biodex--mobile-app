import React from 'react';
import { View, Button, StatusBar } from 'react-native';

const ButterflySelectionScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle='light-content' />
      <Button onPress={() => navigation.navigate('ImageCapture')} title='Go back to Home' />
    </View>
  );
};

export default ButterflySelectionScreen;
