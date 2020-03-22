import React from "react";
import { Provider } from "mobx-react";
import { AppStore, DataStore } from "store";
import Router from "Router";

const App = () => (
  <Provider appStore={new AppStore()} dataStore={new DataStore()}>
    <Router />
  </Provider>
);

export default App;
