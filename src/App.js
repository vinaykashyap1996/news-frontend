import React from "react";
import Mainrouter from "./mainrouter";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

const App = () => (
  <ToastProvider>
    <BrowserRouter>
      <Mainrouter />
    </BrowserRouter>
  </ToastProvider>
);

export default App;
