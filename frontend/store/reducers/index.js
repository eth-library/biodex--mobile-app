import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { resetPasswordReducer } from './resetPasswordReducer';
import { invitationReducer } from './invitationReducer';
import { registrationReducer } from './registrationReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  resetPassword: resetPasswordReducer,
  invitation: invitationReducer,
  registration: registrationReducer
});

export default rootReducer;
