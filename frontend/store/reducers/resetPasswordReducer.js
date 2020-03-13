import { RESET_PASSWORD, STORE_RESET_ERROR } from '../types';

const initialState = { email: '', error: null };

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD:
      return {
        ...state,
        email: action.payload,
        error: null
      };
    case STORE_RESET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
