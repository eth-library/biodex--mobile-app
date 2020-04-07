import {SET_NETWORK_ERROR, CLEAR_NETWORK_ERROR } from '../types';

export const setNetworkErrorAction = () => {
  return {
    type: SET_NETWORK_ERROR
  };
};

export const resetNetworkErrorAction = () => {
  return {
    type: CLEAR_NETWORK_ERROR
  };
};

export const networkErrorAsyncAction = () => (dispatch, getState) => {
  dispatch(setNetworkErrorAction());
  setTimeout(() => dispatch(resetNetworkErrorAction()), 2000);
};
