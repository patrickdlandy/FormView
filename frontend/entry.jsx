//entry file

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import  { login, logout, signup } from './actions/session_actions';
import { fetchForms, fetchForm } from './actions/form_actions';

document.addEventListener("DOMContentLoaded", function() {

  //window tests
  window.login = login;
  window.logout = logout;
  window.signup = signup;
  window.fetchForms = fetchForms;
  window.fetchForm = fetchForm;

  let store;

  //handle user defined on window
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  window.getState = store.getState;
  window.dispatch = store.dispatch;

  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});