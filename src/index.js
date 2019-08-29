import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import Client from "./containers/Client";
import "./index.css";

const store = configureStore();

// wraps the site with redux
const Site = () => (
  <Provider store={store}>
    <Client />
  </Provider>
);

ReactDOM.render(<Site />, document.getElementById("root"));
