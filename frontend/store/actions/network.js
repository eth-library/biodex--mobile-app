import {
  SET_NETWORK_ERROR,
  CLEAR_NETWORK_ERROR,
  SET_NETWORK_SUCCESS,
  CLEAR_NETWORK_SUCCESS,
} from '../types';

const setNetworkErrorAction = () => {
  return {
    type: SET_NETWORK_ERROR,
  };
};

const resetNetworkErrorAction = () => {
  return {
    type: CLEAR_NETWORK_ERROR,
  };
};

export const networkErrorAsyncAction = () => (dispatch, getState) => {
  dispatch(setNetworkErrorAction());
  setTimeout(() => dispatch(resetNetworkErrorAction()), 2000);
};

const setNetworkSuccessAction = (message) => {
  return {
    type: SET_NETWORK_SUCCESS,
    payload: message,
  };
};

const resetNetworkSuccessAction = () => {
  return {
    type: CLEAR_NETWORK_SUCCESS,
  };
};

export const networkSuccessAsyncAction = (message) => (dispatch, getState) => {
  dispatch(setNetworkSuccessAction(message));
  setTimeout(() => dispatch(resetNetworkSuccessAction()), 2000);
};
