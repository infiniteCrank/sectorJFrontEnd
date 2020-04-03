import React from 'react';
import {Route} from 'react-router-dom';
import authClient from '../auth/Auth';
import LoginForm from '../login/LoginForm';

function SecuredRoute(props) {
  const {component: Component, path} = props;
  return (
    <Route path={path} render={() => {
        console.log(authClient.isAuthenticated())
        console.log(authClient.getIdToken())
        if (!authClient.isAuthenticated()) {
            return <LoginForm />
        }
        return <Component />
    }} />
  );
}

export default SecuredRoute;