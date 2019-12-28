import React from "react";
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from "./session_form/login_form_container";
import SignupFormContainer from "./session_form/signup_form_container";
import SplashContainer from "./splash/splash_container";
import FormShowContainer from "./form_show/form_show_container";
import FormCreateContainer from "./form_create/form_create_container";
import FormEditContainer from "./form_edit/form_edit_container";
import FormShareContainer from "./form_share/form_share_container";
import ResponseIndex from "./response_index/response_index_container";
import Placeholder from "./placeholder/placeholder";
const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={SplashContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
      <ProtectedRoute path="/forms/:formId" component={FormShowContainer} />
      <ProtectedRoute path="/new" component={FormCreateContainer} />
      <ProtectedRoute path="/edit/:formId" component={FormEditContainer} />
      <ProtectedRoute path="/responses/:formId" component={ResponseIndex} />
      <ProtectedRoute path="/placeholder" component={Placeholder} />
      <Route exact path="/share/:formId" component={FormShareContainer} />
    </Switch>
  </div>
);

export default App;