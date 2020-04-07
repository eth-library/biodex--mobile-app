import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { resetPasswordReducer } from './resetPasswordReducer';
import { invitationReducer } from './invitationReducer';
import { registrationReducer } from './registrationReducer';
import { imagesReducer } from './imagesReducer';
import { networkReducer } from './networkReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  resetPassword: resetPasswordReducer,
  invitation: invitationReducer,
  registration: registrationReducer,
  images: imagesReducer,
  network: networkReducer,
});

export default rootReducer;
