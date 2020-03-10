import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/authentication/Login';
import Registration from '../screens/authentication/Registration';
import ResetPassword from '../screens/authentication/ResetPassword';
import ResetPasswordValidation from '../screens/authentication/ResetPasswordValidation';

const Stack = createStackNavigator();

const AuthStackNavigator = props => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Registration' component={Registration} />
      <Stack.Screen name='ResetPassword' component={ResetPassword} />
      <Stack.Screen name='ResetPasswordValidation' component={ResetPasswordValidation} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
