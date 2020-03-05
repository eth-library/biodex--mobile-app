import React from 'react';
import { View, Text, Button } from 'react-native';

function ImageCaptureScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ImageCaptureScreen Screen</Text>
      <Button title='Go to ImageCapture... again' onPress={() => navigation.push('ImageCapture')} />
      <Button title='Go to ButterflySelection' onPress={() => navigation.navigate('ButterflySelection')} />
      <Button title='Push to Home' onPress={() => navigation.push('Home')} />
      <Button title='Go back' onPress={() => navigation.goBack()} />
      <Button title='Go back to first screen in stack' onPress={() => navigation.popToTop()} />
    </View>
  );
}

export default ImageCaptureScreen;
