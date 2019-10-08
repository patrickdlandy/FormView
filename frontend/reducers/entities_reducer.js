import   { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import formsReducer from './forms_reducer';
//import sessionReducer from 'session_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  forms: formsReducer
});

export default entitiesReducer;