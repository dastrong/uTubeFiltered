import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Client from "./containers/Client";
import configureStore from "./store";
import { Provider } from "react-redux";
require("dotenv").config();

const store = configureStore();

// wraps the site with redux
const Site = () => (
	<Provider store={store}>
		<Client />
	</Provider>
);

ReactDOM.render(<Site />, document.getElementById("root"));
