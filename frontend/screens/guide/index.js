import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ImageCaptureScreen from './ImageCaptureScreen';
import ButterflySelectionScreen from './ButterflySelectionScreen';

const Stack = createStackNavigator();

const Guide = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ gestureEnabled: true }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ImageCapture" component={ImageCaptureScreen} options={{ title: 'Image Capture'}} />
        <Stack.Screen name="ButterflySelection" component={ButterflySelectionScreen} options={{ title: 'Butterfly Selection'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Guide;
