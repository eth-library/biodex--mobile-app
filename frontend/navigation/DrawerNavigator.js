import React from 'react';
import { View, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Theme from '../theme';
import ImageCaptureStackNavigator from './ImageCaptureStackNavigator';
import InvitationStackNavigator from './InvitationStackNavigator';
import AboutStackNavigator from './AboutStackNavigator';
import Guide from '../screens/guide';
import { logoutAsyncAction } from '../store/actions/auth';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, marginBottom: 30 }}>
      <View style={{ height: '100%', justifyContent: 'space-between' }}>
        <View>
          <DrawerItem
            label='Home'
            icon={() => (
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
                size={23}
                color={Theme.colors.primary}
              />
            )}
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                })
              )
            }
          />
          <DrawerItem
            label='How to'
            icon={() => (
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-help-circle' : 'md-help-circle'}
                size={23}
                color={Theme.colors.primary}
              />
            )}
            onPress={() => navigation.navigate('How to')}
          />
          <DrawerItem
            label='About'
            icon={() => (
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-information-circle' : 'md-information-circle'}
                size={23}
                color={Theme.colors.primary}
              />
            )}
            onPress={() => navigation.navigate('About')}
          />
          <DrawerItem
            label='Invite new users'
            icon={() => (
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'}
                size={23}
                color={Theme.colors.primary}
              />
            )}
            onPress={() => navigation.navigate('Invite new users')}
          />
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
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerStyle={{ backgroundColor: Theme.colors.background }}
      initialRouteName='Home'
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name='Home' component={ImageCaptureStackNavigator} />
      <Drawer.Screen
        name='How to'
        component={Guide}
        options={{
          gestureEnabled: false,
        }}
      />
      <Drawer.Screen name='About' component={AboutStackNavigator} />
      <Drawer.Screen name='Invite new users' component={InvitationStackNavigator} />
    </Drawer.Navigator>
  );
}
