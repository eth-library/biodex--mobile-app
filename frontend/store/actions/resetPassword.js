import * as Sentry from 'sentry-expo';

import { rootEndpoint } from '../../constants';
import { RESET_PASSWORD, STORE_RESET_ERROR } from '../types';
import formatDjangoErrors from '../helpers/formatDjangoErrors';
import { networkSuccessAsyncAction, networkErrorAsyncAction } from './network';

// store JWT's after a user has logged in manually
const storeResetEmail = (email) => {
  return {
    type: RESET_PASSWORD,
    payload: email,
  };
};

const storeErrorAction = (error) => {
  return {
    type: STORE_RESET_ERROR,
    payload: error,
  };
};

export const resetPasswordAsyncAction = (email) => async (dispatch, getState) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const method = 'POST';
  const body = JSON.stringify({ email });
  const config = { headers, method, body };

  try {
    const response = await fetch(`${rootEndpoint}/auth/password-reset/`, config);
    if (response.ok) {
      dispatch(storeResetEmail(email));
      dispatch(networkSuccessAsyncAction('We have sent a code to your email!'));
    } else {
      const errors = await response.json();
      const cleanedErrors = formatDjangoErrors(errors);
      dispatch(storeErrorAction(cleanedErrors));
    }
    return response;
  } catch (e) {
    dispatch(networkErrorAsyncAction());
    console.log('ERROR IN resetPasswordAsyncAction: ', e.message);
    Sentry.captureException(e);
  }
};

export const resetPasswordValidationAsyncAction = (data) => async (dispatch, getState) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const method = 'PATCH';
  const body = JSON.stringify(data);
  const config = { headers, method, body };

  try {
    const response = await fetch(`${rootEndpoint}/auth/password-reset/validation/`, config);
    if (response.ok) {
      dispatch(networkSuccessAsyncAction('Your password has been reset!'));
    } else {
      const errors = await response.json();
      const cleanedErrors = formatDjangoErrors(errors);
      dispatch(storeErrorAction(cleanedErrors));
    }
    return response;
  } catch (e) {
    dispatch(networkErrorAsyncAction());
    console.log('ERROR IN resetPasswordValidationAsyncAction :', e.message);
    Sentry.captureException(e);
  }
};
