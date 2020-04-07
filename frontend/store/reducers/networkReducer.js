import {
  SET_NETWORK_ERROR,
  CLEAR_NETWORK_ERROR,
  SET_NETWORK_SUCCESS,
  CLEAR_NETWORK_SUCCESS,
} from '../types';

const initialState = {
  error: false,
  success: false,
  successText: 'Success',
};

export const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NETWORK_ERROR:
      return {
        ...state,
        error: true,
      };
    case CLEAR_NETWORK_ERROR:
      return {
        ...state,
        error: null,
      };
    case SET_NETWORK_SUCCESS:
      return {
        ...state,
        success: true,
        successText: action.payload,
      };
    case CLEAR_NETWORK_SUCCESS:
      return {
        ...state,
        success: false,
        successText: 'Success!',
      };
    default:
      return state;
  }
};
