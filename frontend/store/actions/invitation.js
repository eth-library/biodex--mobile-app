import { rootEndpoint } from '../../constants';
import { STORE_INVITATION_ERROR, REMOVE_INVITATION_ERROR } from '../types';
import formatDjangoErrors from '../helpers/formatDjangoErrors';

const storeErrorAction = error => {
  return {
    type: STORE_INVITATION_ERROR,
    payload: error
  };
};

const removeErrorAction = () => {
  return {
    type: REMOVE_INVITATION_ERROR
  };
};

export const sendInvitationAsyncAction = email => async (dispatch, getState) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const method = 'POST';
  const body = JSON.stringify({email});
  const config = { headers, method, body };

  try {
    const response = await fetch(`${rootEndpoint}/auth/registration/`, config);
    if (response.status === 200) {
      dispatch(removeErrorAction());
    }
    if (response.status >= 400) {
      const errors = await response.json();
      const cleanedErrors = formatDjangoErrors(errors);
      dispatch(storeErrorAction(cleanedErrors));
    }
    return response;
  } catch (e) {
    console.log('ERROR TO HANDLE IN sendInvitationAsyncAction: ', e.message);
  }
};
