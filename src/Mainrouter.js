import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import Menu from "./Menu/Menu";
import Signup from "./Signup/Signup";
import Signin from "./Signin/Signin";
import password from "./forgot-password/forgotpassword";
import Profile from "./profile/profile";
import Resetpassword from "./reset-password/resetPassword";

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/forgotpassword" component={password} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/reset/:token" component={Resetpassword} />
    </Switch>
  </div>
);

export default MainRouter;
