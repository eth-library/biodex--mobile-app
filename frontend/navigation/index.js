import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import DrawerNavigator from './DrawerNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import LoadingScreen from '../components/LoadingScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreToken = async () => {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      let accessToken = null;
      let isAuthenticated = false;

      if (refreshToken) {
        try {
          // fetch new token with jwt refresh url
          const headers = new Headers({ 'Content-type': 'application/json' });
          const body = JSON.stringify({ refresh: refreshToken })
          const config = { method: 'POST', headers, body }
          const response = await fetch('https://motion.propulsion-home.ch/backend/api/auth/token/refresh/', config);
          const data = await response.json()
          accessToken = data.access
          isAuthenticated = true
        } catch (e) {
          // token invalid - remove token
          console.log('ERROR TO HANDLE RIGHT HERE')
        };
      }
      dispatch({ type: 'RESTORE_TOKEN', payload: { access: accessToken, refresh: refreshToken, isAuthenticated } });
    };

    restoreToken();
  }, []);

  if (auth.isLoading) {
    return <LoadingScreen />;
  };

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
