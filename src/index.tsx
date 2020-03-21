import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

function App() {
  return (
    <div className="App"></div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
