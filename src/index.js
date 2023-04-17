import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import App from "./Components/App/App";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
