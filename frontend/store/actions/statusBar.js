import { SHOW_STATUS_BAR, HIDE_STATUS_BAR, SET_COLOR } from '../types';

export const showStatusBarAction = () => {
  return {
    type: SHOW_STATUS_BAR
  };
};

export const hideStatusBarAction = () => {
  return {
    type: HIDE_STATUS_BAR,
  };
};

export const setStatusBarColorAction = (color) => {
  return {
    type: SET_COLOR,
    payload: color
  }
};
