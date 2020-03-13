import { AsyncStorage } from 'react-native';

import { rootEndpoint } from '../../constants';
import { SIGN_IN, SIGN_OUT } from '../types';

// store JWT's after a user has logged in manually
const storeTokenAction = jwts => {
  return {
    type: SIGN_IN,
    payload: jwts
  };
};

const logoutAction = () => {
  return {
    type: SIGN_OUT,
  };
};

export const logoutAsyncAction = () => async (dispatch, getState) => {
  await AsyncStorage.removeItem('refreshToken');
  dispatch(logoutAction())
};

export const userLoginAsyncAction = (credentials, stayLoggedIn) => async (dispatch, getState) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const method = 'POST';
  const body = JSON.stringify(credentials);
  const config = { headers, method, body };

  try {
    const response = await fetch(`${rootEndpoint}/auth/token/`, config);
    const data = await response.json();
    if (stayLoggedIn) await AsyncStorage.setItem('refreshToken', data.refresh);
    dispatch(storeTokenAction({ access: data.access, refresh: data.refresh }));
  } catch (e) {
    console.log('ERROR TO HANDLE RIGHT HERE');
  }
};
