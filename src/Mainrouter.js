import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./home/home";
import Menu from "./menu/menu";
import Signup from "./signup/signup";
import Signin from "./signin/signin";
import password from "./forgot-password/forgotpassword";
import Profile from "./profile/profile";
import Newprofile from "./newprofile/newprofile";
import Reset from "./reset-password/resetPassword";
import Changepassword from "./change-password/changepassword";
import Reportbug from "./reportbug/reportbug";
import Language from "./language/language";
import Category from "./category/category";
import Task from "./task/task";
class MainRouter extends React.Component {
  state = {
    isLoggedIn: sessionStorage.getItem("userID") ? true : false,
    Taskvalue: sessionStorage.getItem("Taskvalue")
  };
  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };
  render() {
    return (
      <div>
        <Menu isLoggedIn={this.state.isLoggedIn} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/signup"
            component={() => <Signup onLogin={this.onLogin} />}
          />
          <Route
            exact
            path="/signin"
            component={() => <Signin onLogin={this.onLogin} />}
          />
          <Route exact path="/task" component={Task} />
          <Route exact path="/forgotpassword" component={password} />
          <ProtectedRoute exact path="/language" component={Language} />
          <ProtectedRoute exact path="/category" component={Category} />
          <ProfileRoute />
          <ProtectedRoute
            exact
            path="/changepassword"
            component={Changepassword}
          />
          <ProtectedRoute exact path="/report/:newsId" component={Reportbug} />
          <Route exact path="/reset/:token" component={Reset} />
        </Switch>
      </div>
    );
  }
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      sessionStorage.getItem("userID") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/signin", state: { from: props.location } }}
        />
      )
    }
  />
);

const ProfileRoute = () =>
  sessionStorage.getItem("Taskvalue") !== "1" ? (
    <ProtectedRoute exact path="/profile" component={Profile} />
  ) : (
    <ProtectedRoute exact path="/profile" component={Newprofile} />
  );

export default MainRouter;
