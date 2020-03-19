import React from 'react';
import { View, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import Theme from '../theme';
import ImageCaptureStackNavigator from './ImageCaptureStackNavigator';
import InvitationStackNavigator from './InvitationStackNavigator';
import Guide from '../screens/guide';
import { logoutAsyncAction } from '../store/actions/auth';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, marginBottom: 30 }}>
      <View style={{ height: '100%', justifyContent: 'space-between' }}>
        <View>
          <DrawerItemList {...props} style={{ backgroundColor: 'yellow' }} />
        </View>
        <View>
          <DrawerItem
            label='Logout'
            icon={() => (
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
                size={23}
                color={Theme.colors.primary}
              />
            )}
            onPress={() => dispatch(logoutAsyncAction())}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerStyle={{ backgroundColor: Theme.colors.background }}
      initialRouteName='Home'
      drawerContent={props => <CustomDrawerContent {...props} />}
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
      <Drawer.Screen
        name='Invite new users'
        component={InvitationStackNavigator}
        options={{
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'}
              size={23}
              color={Theme.colors.primary}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
}
