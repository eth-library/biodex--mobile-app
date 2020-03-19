import { STORE_INVITATION_ERROR, REMOVE_INVITATION_ERROR } from '../types';

const initialState = { error: null };

export const invitationReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_INVITATION_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case REMOVE_INVITATION_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
