import { AsyncStorage } from 'react-native';

import { rootEndpoint } from '../../constants';
import { SIGN_IN, SIGN_OUT, STORE_AUTH_ERROR } from '../types';

// store JWT's after a user has logged in manually
const storeTokenAction = jwts => {
  return {
    type: SIGN_IN,
    payload: jwts
  };
};

const logoutAction = () => {
  return {
    type: SIGN_OUT
  };
};

const storeErrorAction = error => {
  return {
    type: STORE_AUTH_ERROR,
    payload: error
  };
};

export const logoutAsyncAction = () => async (dispatch, getState) => {
  await AsyncStorage.removeItem('refreshToken');
  dispatch(logoutAction());
};

export const userLoginAsyncAction = (credentials, stayLoggedIn) => async (dispatch, getState) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const method = 'POST';
  const body = JSON.stringify(credentials);
  const config = { headers, method, body };

  try {
    const response = await fetch(`${rootEndpoint}/auth/token/`, config);
    console.log('status', JSON.stringify(response));
    const data = await response.json();
    if (response.status === 200) {
      if (stayLoggedIn) await AsyncStorage.setItem('refreshToken', data.refresh);
      dispatch(storeTokenAction({ access: data.access, refresh: data.refresh }));
    }
    if (response.status >= 400) {
      dispatch(storeErrorAction(data.detail));
    }
  } catch (e) {
    console.log('ERROR TO HANDLE RIGHT HERE');
  }
};
