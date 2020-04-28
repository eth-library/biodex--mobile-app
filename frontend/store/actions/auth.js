import { AsyncStorage } from 'react-native';
import * as Sentry from 'sentry-expo';

import { rootEndpoint } from '../../constants';
import { SIGN_IN, SIGN_OUT, STORE_AUTH_ERROR } from '../types';
import formatDjangoErrors from '../helpers/formatDjangoErrors';
import { networkErrorAsyncAction } from './network';

// store JWT's and user, after a user has logged in manually
const storeTokenAction = data => {
  return {
    type: SIGN_IN,
    payload: data
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
    if (response.ok) {
      const data = await response.json();
      if (stayLoggedIn) await AsyncStorage.setItem('refreshToken', data.refresh);
      dispatch(storeTokenAction({ access: data.access, refresh: data.refresh, user: data.user }));
    } else {
      const errors = await response.json();
      const cleanedErrors = formatDjangoErrors(errors);
      dispatch(storeErrorAction(cleanedErrors));
    }
  } catch (e) {
    dispatch(networkErrorAsyncAction());
    console.log('ERROR IN userLoginAsyncAction: ', e.message);
    Sentry.captureException(e);
  }
};
