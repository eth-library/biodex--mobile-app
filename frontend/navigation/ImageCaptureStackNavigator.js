import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

import ImageCaptureScreen from '../screens/imageCapture/ImageCaptureScreen';
import ImageCaptureConfirmationScreen from '../screens/imageCapture/ImageCaptureConfirmationScreen';
import ButterflySelectionScreen from '../screens/imageCapture/ButterflySelectionScreen';
import Theme from '../theme';
import withOrientation from '../HOC/withOrientation';

const Stack = createStackNavigator();

const IoniconsHeaderButton = props => (
  <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Theme.colors.white} />
);

const ImageCaptureStackNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.accent },
        headerTintColor: Theme.colors.white,
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item
              title='search'
              iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
              onPress={() => props.navigation.openDrawer()}
            />
          </HeaderButtons>
        ),
        gestureEnabled: false
      }}
    >
      <Stack.Screen
        name='ImageCapture'
        component={withOrientation(ImageCaptureScreen)}
        options={{ title: 'Image Capture' }}
      />
      <Stack.Screen
        name='ImageConfirm'
        component={withOrientation(ImageCaptureConfirmationScreen)}
        options={{ title: 'Upload' }}
      />
      <Stack.Screen
        name='ButterflySelection'
        component={withOrientation(ButterflySelectionScreen)}
        options={{
          title: 'Results',
          
        }}
      />
    </Stack.Navigator>
  );
};

export default ImageCaptureStackNavigator;
