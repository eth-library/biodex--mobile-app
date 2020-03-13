import { RESET_PASSWORD } from '../types';

const initialState = { email: '' };

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD:
      return {
        ...state,
        email: action.payload
      };
    default:
      return state;
  }
};
