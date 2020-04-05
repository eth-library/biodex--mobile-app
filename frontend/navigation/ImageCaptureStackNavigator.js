import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

import ImageCaptureScreen from '../screens/imageCapture/ImageCaptureScreen';
import ImageCaptureConfirmationScreen from '../screens/imageCapture/ImageCaptureConfirmationScreen';
import ButterflySelectionScreen from '../screens/imageCapture/ButterflySelectionScreen';
import Theme from '../theme';
import { Platform } from 'react-native';

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
        )
      }}
    >
      <Stack.Screen
        name='ImageCapture'
        component={ImageCaptureScreen}
        options={{ title: 'Image Capture' }}
      />
      <Stack.Screen
        name='ImageConfirm'
        component={ImageCaptureConfirmationScreen}
        options={{ title: 'Upload' }}
      />
      <Stack.Screen
        name='ButterflySelection'
        component={ButterflySelectionScreen}
        options={{
          title: 'Results',
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
              <Item
                title='search'
                iconName={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
                onPress={() => props.navigation.push('ImageCapture')}
              />
            </HeaderButtons>
          )
        }}
      />
    </Stack.Navigator>
  );
};

export default ImageCaptureStackNavigator;
