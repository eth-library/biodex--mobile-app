import React from 'react';
import { View, Button, StatusBar } from 'react-native';

const ImageCaptureScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle='light-content' />
      <Button
        onPress={() => navigation.navigate('ImageConfirm')}
        title='Go to image confirmation'
      />
    </View>
  );
};

export default ImageCaptureScreen;
