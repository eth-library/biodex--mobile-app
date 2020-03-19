import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { resetPasswordReducer } from './resetPasswordReducer';
import { invitationReducer } from './invitationReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  resetPassword: resetPasswordReducer,
  invitation: invitationReducer
});

export default rootReducer;
