import { RESTORE_TOKEN, SIGN_IN, SIGN_OUT } from '../types';

const initialState = { access: null, refresh: null, isAuthenticated: false, isLoading: true };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        access: action.payload.access,
        refresh: action.payload.refresh,
        isAuthenticated: action.payload.isAuthenticated,
        isLoading: false
      };
    case SIGN_IN:
      return {
        ...state,
        access: action.payload.access,
        refresh: action.payload.refresh,
        isAuthenticated: true
      };
    case SIGN_OUT:
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};
