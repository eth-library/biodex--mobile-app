import * as Sentry from 'sentry-expo';

import { rootEndpoint } from '../../constants';
import { STORE_REGISTRATION_ERROR, REMOVE_REGISTRATION_ERROR } from '../types';
import formatDjangoErrors from '../helpers/formatDjangoErrors';
import { networkSuccessAsyncAction, networkErrorAsyncAction } from './network';

const storeErrorAction = (error) => {
  return {
    type: STORE_REGISTRATION_ERROR,
    payload: error,
  };
};

const removeErrorAction = () => {
  return {
    type: REMOVE_REGISTRATION_ERROR,
  };
};

export const userRegistrationValidationAsyncAction = (data) => async (dispatch, getState) => {
  const cleanData = {
    email: data.email,
    code: data.code,
    password: data.password,
    password_repeat: data.passwordRepeat,
    full_name: data.fullName,
    user_type: data.user_type === 'Expert' ? 'EX' : 'ST',
  };

  const headers = new Headers({ 'Content-Type': 'application/json' });
  const method = 'PATCH';
  const body = JSON.stringify(cleanData);
  const config = { headers, method, body };

  try {
    const response = await fetch(`${rootEndpoint}/auth/registration/validation/`, config);
    if (response.ok) {
      dispatch(removeErrorAction());
      dispatch(networkSuccessAsyncAction('Your account was created!'));
    } else {
      const errors = await response.json();
      const cleanedErrors = formatDjangoErrors(errors);
      dispatch(storeErrorAction(cleanedErrors));
    }
    return response;
  } catch (e) {
    dispatch(networkErrorAsyncAction());
    console.log('ERROR TO HANDLE IN userRegistrationValidationAsyncAction: ', e.message);
    Sentry.captureException(e);
  }
};
