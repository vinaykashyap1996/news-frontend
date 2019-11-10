import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Signin.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { isModuleDeclaration } from "@babel/types";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      success: false,
      message: "",
      error: ""
    };
  }
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    axios
      .post("http://localhost:3002/user/signin", { email, password })
      .then(response => {
        if (response.status === 200) {
          console.log(response);
          this.setState({ success: true, message: response.data.message });
          sessionStorage.setItem("userID", response.data.userData._id);
        } else {
          this.setState({ success: false, message: response.data.message });
        }
      });
  };
  render() {
    if (this.state.success) {
      return <Redirect to="/profile" />;
    }
    return (
      <div className="signincontainer">
        <div className="signinformlayout">
          <h1>SIGN IN</h1>
          <span className="jss448"></span>
          <h5>
            not a member yet ?{" "}
            <Link className="nav-link" to="/signup">
              signup here
            </Link>
          </h5>
          <div>
            <TextField
              id="outlined-basic"
              className={"textField"}
              label="Email"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange("email")}
              value={this.state.email}
            />
          </div>
          <div>
            <TextField
              className={"textField"}
              label="Password"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange("password")}
              value={this.state.password}
            />
          </div>
          <div className={"button"}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.onSubmit}
            >
              SIGN IN
            </Button>
          </div>
          <div className="forgotpassword">
            <Link class="nav-link" to="/forgotpassword">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
