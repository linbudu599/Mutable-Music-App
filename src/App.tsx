//@ts-nocheck
import React from "react";
import { Provider } from "react-redux";
import { GlobalStyle } from "./style";
import { renderRoutes } from "react-router-config";
import { IconStyle } from "./assets/iconfont/iconfont";
import store from "./store/index";
import routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {renderRoutes(routes)}
      </Router>
    </Provider>
  );
}

export default App;
