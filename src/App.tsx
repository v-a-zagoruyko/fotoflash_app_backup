import React from "react";
import { Provider } from "mobx-react";
import { AppStore } from "store";
import Router from "Router";

const App = () => (
  <Provider appStore={new AppStore()}>
    <Router />
  </Provider>
);

export default App;
