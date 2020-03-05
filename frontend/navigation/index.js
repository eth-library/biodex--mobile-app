import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Platform } from 'react-native';

import Login from '../screens/authentication/Login';
import Registration from '../screens/authentication/Registration';

const Stack = createStackNavigator();

const AuthStackNavigator = props => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Registration' component={Registration} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
