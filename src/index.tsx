import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { ToastProvider } from "react-toast-notifications";
import App from "./App";
import rootStore from "./store";

ReactDOM.render(
  <ToastProvider>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Provider {...rootStore}>
      <App />
    </Provider>
  </ToastProvider>,
  document.getElementById("root")
);
