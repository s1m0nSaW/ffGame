import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>  
  </BrowserRouter>
, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
