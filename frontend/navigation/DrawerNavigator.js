import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import Theme from '../theme';
import ImageCaptureStackNavigator from './ImageCaptureStackNavigator';
import Guide from '../screens/guide';
import { Platform } from 'react-native';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerStyle={{ backgroundColor: Theme.colors.background }}
      initialRouteName='Home'
    >
      <Drawer.Screen
        name='Image Capture'
        component={ImageCaptureStackNavigator}
        options={{
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
              size={23}
              color={Theme.colors.primary}
            />
          )
        }}
      />
      <Drawer.Screen
        name='How to'
        component={Guide}
        options={{
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-help-circle' : 'md-help-circle'}
              size={23}
              color={Theme.colors.primary}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
}
