import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { resetPasswordReducer } from './resetPasswordReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  resetPassword: resetPasswordReducer
});

export default rootReducer;
