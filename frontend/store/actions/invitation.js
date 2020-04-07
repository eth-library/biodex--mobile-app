import * as Sentry from 'sentry-expo';

import { rootEndpoint } from '../../constants';
import { STORE_INVITATION_ERROR, REMOVE_INVITATION_ERROR } from '../types';
import formatDjangoErrors from '../helpers/formatDjangoErrors';
import { networkSuccessAsyncAction, networkErrorAsyncAction } from './network';

const storeErrorAction = (error) => {
  return {
    type: STORE_INVITATION_ERROR,
    payload: error,
  };
};

export const removeErrorAction = () => {
  return {
    type: REMOVE_INVITATION_ERROR,
  };
};

export const sendInvitationAsyncAction = (email) => async (dispatch, getState) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getState().auth.access}`,
  });
  const method = 'POST';
  const body = JSON.stringify({ email });
  const config = { headers, method, body };

  try {
    const response = await fetch(`${rootEndpoint}/auth/registration/`, config);
    if (response.ok) {
      dispatch(removeErrorAction());
      dispatch(networkSuccessAsyncAction('Your invitation has been sent!'));
    } else {
      const errors = await response.json();
      const cleanedErrors = formatDjangoErrors(errors);
      dispatch(storeErrorAction(cleanedErrors));
    }
    return response;
  } catch (e) {
    dispatch(networkErrorAsyncAction());
    console.log('ERROR TO HANDLE IN sendInvitationAsyncAction: ', e.message);
    Sentry.captureException(e);
  }
};
