import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import Menu from "./Menu/Menu";
import Signup from "./Signup/Signup";
import Signin from "./Signin/Signin";
import password from "./forgot-password/forgotpassword";
import Profile from "./profile/profile";
import Resetpassword from "./reset-password/resetPassword";
import Changepassword from "./change-password/changepassword";
import Reportbug from "./Reportbug/reportbug";
import Language from "./Language/language";
import Category from "./Category/category";

class MainRouter extends React.Component {
  state = {
    isLoggedIn: sessionStorage.getItem("userID") ? true : false
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
          <Route exact path="/forgotpassword" component={password} />
          <ProtectedRoute exact path="/language" component={Language} />
          <ProtectedRoute exact path="/category" component={Category} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute
            exact
            path="/changepassword"
            component={Changepassword}
          />
          <ProtectedRoute exact path="/report/:newsId" component={Reportbug} />
          <Route exact path="/reset/:token" component={Resetpassword} />
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

export default MainRouter;
