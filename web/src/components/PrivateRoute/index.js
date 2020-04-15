import { Redirect, Route } from 'react-router-dom';

import React from 'react';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) => (!isAuthenticated ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
};

export default PrivateRoute;
