import React from "react";
import {
  Router as ReactRouter,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import {
  Home,
  News,
  Equipment,
  Rent,
  Profile,
  Login,
  SignUp,
  Password,
  Default
} from "pages";
import { history } from "utils/history";

const UnauthorizedRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Redirect to="/user" />
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
        <Redirect to="/login" />
      )
    }
  />
);

const Router = () => (
  <ReactRouter history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/news" component={News} />
      <Route exact path="/equipment" component={Equipment} />
      <Route exact path="/rent" component={Rent} />
      <AuthorizedRoute exact path="/user" component={Profile} />
      <UnauthorizedRoute exact path="/login" component={Login} />
      <UnauthorizedRoute exact path="/signup" component={SignUp} />
      <UnauthorizedRoute path="/password-reset/confirm" component={Password} />
      <Route component={Default} />
    </Switch>
  </ReactRouter>
);

export default Router;
