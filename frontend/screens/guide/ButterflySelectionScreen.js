import React from 'react';
import { View, Text, Button } from 'react-native';

function ButterflySelectionScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ButterflySelection Screen</Text>
      <Button
        title="Go to ImageCapture"
        onPress={() => navigation.navigate('ImageCapture')}
      />
    </View>
  );
}

export default ButterflySelectionScreen;
