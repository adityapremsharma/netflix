import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "./scss/main.scss";

import { Provider as ApiProvider } from "./context/apiProvider";
import { Provider as StylesProvider } from "./context/stylesProvider";
import { Provider as StreamProvider } from "./context/streamProvider";

ReactDOM.render(
  <React.StrictMode>
    <StreamProvider>
      <StylesProvider>
        <ApiProvider>
          <App />
        </ApiProvider>
      </StylesProvider>
    </StreamProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
