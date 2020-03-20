import { STORE_REGISTRATION_ERROR, REMOVE_REGISTRATION_ERROR } from '../types';

const initialState = { error: null };

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_REGISTRATION_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case REMOVE_REGISTRATION_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
