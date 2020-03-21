import React from "react";
import {
  Router as ReactRouter,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import { Home } from "pages";
import { history } from "utils";

const UnauthorizedRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const AuthorizedRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const Router = () => (
  <ReactRouter history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </ReactRouter>
);

export default Router;
