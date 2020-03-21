import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

class App extends React.Component {
  render() {
    return <div className="App">123</div>;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
