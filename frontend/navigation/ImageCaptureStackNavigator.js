import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

import ImageCaptureScreen from '../screens/imageCapture/ImageCaptureScreen';
import ButterflySelectionScreen from '../screens/imageCapture/ButterflySelectionScreen';
import Theme from '../theme';

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
        headerTitleAlign: 'center',
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
        component={ImageCaptureScreen}
        options={{ title: 'Image Capture' }}
      />
      <Stack.Screen
        name='ButterflySelection'
        component={ButterflySelectionScreen}
        options={{
          title: 'Results',
        }}
      />
    </Stack.Navigator>
  );
};

export default ImageCaptureStackNavigator;
