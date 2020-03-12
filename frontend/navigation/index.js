import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import DrawerNavigator from './DrawerNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import LoadingScreen from '../components/LoadingScreen';
import { AsyncStorage } from 'react-native';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  

  useEffect(() => {
    console.log('restore token');
    const restoreToken = async () => {
      let accessToken = null;
      let refreshToken = null;
      let isAuthenticated = false;
  
      try {
        refreshToken = await AsyncStorage.getItem('refreshToken');
      } catch (e) {
        // restoring token failed
      };
  
      if (refreshToken) {
        try {
          // fetch new token with jwt refresh url
          const headers = new Headers({ 'Content-type': 'application/json' });
          const body = JSON.stringify({ refresh: refreshToken })
          const config = { method: 'POST', headers, body }
          const response = await fetch('https://motion.propulsion-home.ch/backend/api/auth/token/refresh/', config);
          const data = await response.json()
          accessToken = data.access
        } catch (e) {
          // token invalid - remove token
        };
      }
  
      dispatch({ type: 'RESTORE_TOKEN', payload: { access: accessToken, refresh: refreshToken, isAuthenticated } });
    };

    restoreToken();
  }, []);

  console.log('xx', auth.isLoading);

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
