//entry file

import React from 'react';
import ReactDOM from 'react-dom';
// import Root from './components/root';
// import configureStore from './store/store';
import  { login, logout, signup } from './util/session_api_util';

document.addEventListener("DOMContentLoaded", function() {

  //window tests
  window.login = login;
  window.logout = logout;
  window.signup = signup;

  ReactDOM.render(<h1>FORMVIEW</h1>, document.getElementById('root'));
});