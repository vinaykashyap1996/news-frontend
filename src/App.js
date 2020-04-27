import React from "react";
import Mainrouter from "./Mainrouter";
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
