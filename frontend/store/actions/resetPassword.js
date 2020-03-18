import { rootEndpoint } from '../../constants';
import { RESET_PASSWORD, STORE_RESET_ERROR } from '../types';
import formatDjangoErrors from '../helpers/formatDjangoErrors';

// store JWT's after a user has logged in manually
const storeResetEmail = email => {
  return {
    type: RESET_PASSWORD,
    payload: email
  };
};

const storeErrorAction = error => {
  return {
    type: STORE_RESET_ERROR,
    payload: error
  };
};

export const resetPasswordAsyncAction = email => async (dispatch, getState) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const method = 'POST';
  const body = JSON.stringify({ email });
  const config = { headers, method, body };

  try {
    const response = await fetch(`${rootEndpoint}/auth/password-reset/`, config);
    if (response.status === 200) dispatch(storeResetEmail(email));
    if (response.status >= 400) {
      const errors = await response.json();
      const cleanedErrors = formatDjangoErrors(errors);
      dispatch(storeErrorAction(cleanedErrors));
    }
    return response;
  } catch (e) {
    console.log('ERROR TO HANDLE IN resetPasswordAsyncAction: ', e.message);
  }
};

export const resetPasswordValidationAsyncAction = data => async (dispatch, getState) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const method = 'PATCH';
  const body = JSON.stringify(data);
  const config = { headers, method, body };

  try {
    const response = await fetch(`${rootEndpoint}/auth/password-reset/validation/`, config);
    if (response.status === 200) console.log('SUCCESS - REDIRECT TO LOGIN');
    if (response.status >= 400) {
      const errors = await response.json();
      const cleanedErrors = formatDjangoErrors(errors);
      dispatch(storeErrorAction(cleanedErrors));
    }
    console.log('reso', response.status)
    return response;
  } catch (e) {
    console.log('ERROR TO HANDLE IN resetPasswordValidationAsyncAction :', e.message);
  }
};
