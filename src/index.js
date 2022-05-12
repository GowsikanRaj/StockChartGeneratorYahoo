import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";

import App from "./Components/App";
import watchlistReducer from "./Reducer";

const store = configureStore({
  reducer: { watchlist: watchlistReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(applyMiddleware(reduxThunk)),
});

const container = document.getElementById("root");

createRoot(container).render(
  <Provider store={store}>
    <App />
  </Provider>
);
