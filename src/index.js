import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { router } from "./routers";
import { RouterContext } from "@happysanta/router";

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(
  <RouterContext.Provider value={router}>
    <Provider store={store}>
        <App />
    </Provider>  
    </RouterContext.Provider>
, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
