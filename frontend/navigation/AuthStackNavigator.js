import React, { useEffect, Fragment } from 'react';
import { AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import LoadingScreen from '../components/LoadingScreen';
import Guide from '../screens/guide';
import Login from '../screens/authentication/Login';
import Registration from '../screens/authentication/Registration';
import ResetPassword from '../screens/authentication/ResetPassword';
import ResetPasswordValidation from '../screens/authentication/ResetPasswordValidation';
import { SET_IS_FIRST_TIME_USER, SET_NOT_FIRST_TIME_USER } from '../store/types';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreUsageInfo = async () => {
      const used = await AsyncStorage.getItem('used');
      if (used) {
        dispatch({
          type: SET_NOT_FIRST_TIME_USER
        });
      } else {
        dispatch({
          type: SET_IS_FIRST_TIME_USER
        });
      }
    };
    restoreUsageInfo();
  }, [auth.isFirstTimeUser]);

  if (auth.firstTimeUserLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator headerMode='none'>
      {auth.isFirstTimeUser ? (
        <Stack.Screen name='Guide' component={Guide} />
      ) : (
        <Fragment>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Registration' component={Registration} />
          <Stack.Screen name='ResetPassword' component={ResetPassword} />
          <Stack.Screen name='ResetPasswordValidation' component={ResetPasswordValidation} />
        </Fragment>
      )}
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
