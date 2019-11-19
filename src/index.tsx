import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import App from "./App";
import rootStore from "./store/index";

ReactDOM.render(
  <Provider
    genresStore={rootStore.genresStore}
    movieStore={rootStore.movieStore}
    filmsStore={rootStore.filmsStore}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);
