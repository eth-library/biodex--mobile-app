import { SHOW_STATUS_BAR, HIDE_STATUS_BAR } from '../types';

const initialState = { hidden: false };

export const statusBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_STATUS_BAR:
      return { hidden: false };
    case HIDE_STATUS_BAR:
      return { hidden: true };
    default:
      return state;
  }
};
