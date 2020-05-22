import { SHOW_STATUS_BAR, HIDE_STATUS_BAR, SET_COLOR } from '../types';

const initialState = { hidden: false, color: 'dark-content' };

export const statusBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_STATUS_BAR:
      return { ...state, hidden: false };
    case HIDE_STATUS_BAR:
      return { ...state, hidden: true };
    case SET_COLOR:
      return { ...state, color: action.payload };
    default:
      return state;
  }
};
