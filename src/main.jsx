import React from "react";
import { Provider } from "react-redux";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./data/storev2";
// import { deposit, withdraw } from "./features/accounts/accountSlice";

// store.dispatch(deposit(1000));
// store.dispatch(withdraw(100));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
