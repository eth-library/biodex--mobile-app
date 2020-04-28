import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import DrawerNavigator from './DrawerNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import LoadingScreen from '../components/LoadingScreen';
import { rootEndpoint } from '../constants';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreToken = async () => {
      let refreshToken = await AsyncStorage.getItem('refreshToken');
      let accessToken = null;
      let isAuthenticated = false;
      let user = null

      if (refreshToken) {
        try {
          // fetch new token with jwt refresh url
          const headers = new Headers({ 'Content-type': 'application/json' });
          const body = JSON.stringify({ refresh: refreshToken });
          const config = { method: 'POST', headers, body };
          const response = await fetch(`${rootEndpoint}/auth/token/refresh/`, config);
          if (response && response.ok) {
            const data = await response.json();
            accessToken = data.access;
            user = data.user
            isAuthenticated = true;
          } else {
            await AsyncStorage.removeItem('refreshToken');
            refreshToken = null;
          }
        } catch (e) {
          console.log('ERROR IN MainNavigator!', e.message);
          Sentry.captureException(e);
        }
      }
      dispatch({
        type: 'RESTORE_TOKEN',
        payload: { access: accessToken, refresh: refreshToken, isAuthenticated, user }
      });
    };

    restoreToken();
  }, []);

  if (auth.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator headerMode='none'>
      {auth.isAuthenticated ? (
        <Stack.Screen name='DrawerNavigator' component={DrawerNavigator} />
      ) : (
        <Stack.Screen name='AuthStackNavigator' component={AuthStackNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
