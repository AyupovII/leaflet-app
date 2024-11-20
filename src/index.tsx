import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import createSagaMiddleware from "redux-saga";
import {configureStore} from "@reduxjs/toolkit";
import routeMapReducer from "./routeMapState"
import routeMapSaga from './routemapSaga';

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    routeMap: routeMapReducer,
  },
  middleware: [saga]
})
saga.run(routeMapSaga).result();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


