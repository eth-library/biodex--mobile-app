import { rootEndpoint } from '../../constants';
import { RESET_PASSWORD } from '../types';

// store JWT's after a user has logged in manually
const storeResetEmail = email => {
  return {
    type: RESET_PASSWORD,
    payload: email
  };
};

export const resetPasswordAsyncAction = email => async (dispatch, getState) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const method = 'POST';
  const body = JSON.stringify({ email });
  const config = { headers, method, body };

  try {
    const response = await fetch(`${rootEndpoint}/auth/password-reset/`, config);
    console.log('CHECK THIS', email, response.status);
    if (response.status === 200) dispatch(storeResetEmail(email));
  } catch (e) {
    console.log('ERROR TO HANDLE RIGHT HERE');
  }
};
