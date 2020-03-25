import React from "react";
import { HashRouter, Switch, Redirect, Route } from "react-router-dom";
import { Home, News, Equipment, Default } from "pages";

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
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/news" component={News} />
      <Route exact path="/equipment" component={Equipment} />
      <Route component={Default} />
    </Switch>
  </HashRouter>
);

export default Router;
