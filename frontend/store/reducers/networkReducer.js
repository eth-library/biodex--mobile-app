import {SET_NETWORK_ERROR, CLEAR_NETWORK_ERROR } from '../types';

const initialState = { error: false };

export const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NETWORK_ERROR:
      return {
        ...state,
        error: true
      };
    case CLEAR_NETWORK_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
