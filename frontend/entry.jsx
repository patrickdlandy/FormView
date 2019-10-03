//entry file

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import  { login, logout, signup } from './actions/session_actions';

document.addEventListener("DOMContentLoaded", function() {

  //window tests
  window.login = login;
  window.logout = logout;
  window.signup = signup;

  const store = configureStore();

  window.getState = store.getState;
  window.dispatch = store.dispatch;

  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});