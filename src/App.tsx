import React from "react";
import { Provider } from "mobx-react";
import { ToastContainer } from "react-toastify";
import { AppStore, DataStore, UserStore } from "store";
import Router from "Router";

const App = () => (
  <Provider
    appStore={new AppStore()}
    dataStore={new DataStore()}
    userStore={new UserStore()}
  >
    <ToastContainer />
    <Router />
  </Provider>
);

export default App;
