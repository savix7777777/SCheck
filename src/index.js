import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./store/store";
import {HashRouter} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
      <HashRouter
          hashType={"slash"}
          basename={"s-check"}
      >
        <Provider store={store}>
           <App />
        </Provider>
      </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
