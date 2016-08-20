import React from 'react';
import ReactDOM from 'react-dom';
import RegisterForm from './register-form.jsx';
import LoginForm from './login-form.jsx';
import Layout from './layout.jsx';
import PersonalPage from './personal-page.jsx';

import {Router, Route, IndexRedirect, hashHistory} from 'react-router';

const router = <Router history={hashHistory}>
  <Route path="/" component={Layout}>
    <IndexRedirect to="/register"/>
    <Route path="/register" component={RegisterForm}/>
    <Route path="/login" component={LoginForm}/>
    <Route path="/personal" component={PersonalPage}/>
  </Route>
</Router>;

ReactDOM.render(
  router,
  document.getElementById("content")
);

// Notice!!!
// Following is required to make reloading happen
if (module.hot) {
  module.hot.accept();
}
