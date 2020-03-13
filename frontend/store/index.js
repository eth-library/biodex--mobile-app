import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import rootReducer from './reducers';

const store = createStore(rootReducer, compose(applyMiddleware(ReduxThunk), composeWithDevTools));

export default store;
