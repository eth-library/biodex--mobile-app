import { combineReducers } from 'redux';

const dummyReducer = (state = {dummy: 'reducer'}, action) => state;

const rootReducer = combineReducers({
  dummy: dummyReducer
});

export default rootReducer;
