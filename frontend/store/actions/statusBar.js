import { SHOW_STATUS_BAR, HIDE_STATUS_BAR } from '../types';

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
