import {
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  STORE_AUTH_ERROR,
  SET_IS_FIRST_TIME_USER,
  SET_NOT_FIRST_TIME_USER
} from '../types';

const initialState = {
  access: null,
  refresh: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  isFirstTimeUser: null,
  firstTimeUserLoading: true
};

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
        isAuthenticated: true,
        error: null
      };
    case SIGN_OUT:
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false
      };
    case STORE_AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_IS_FIRST_TIME_USER:
      return {
        ...state,
        firstTimeUserLoading: false,
        isFirstTimeUser: true
      };
    case SET_NOT_FIRST_TIME_USER:
      return {
        ...state,
        firstTimeUserLoading: false,
        isFirstTimeUser: false
      };
    default:
      return state;
  }
};
