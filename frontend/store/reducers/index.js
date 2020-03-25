import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { resetPasswordReducer } from './resetPasswordReducer';
import { invitationReducer } from './invitationReducer';
import { registrationReducer } from './registrationReducer';
import { imagesReducer } from './imagesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  resetPassword: resetPasswordReducer,
  invitation: invitationReducer,
  registration: registrationReducer,
  images: imagesReducer
});

export default rootReducer;
