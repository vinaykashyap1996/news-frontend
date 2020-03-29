import React, { Component } from "react";
import swal from "sweetalert";

import { withRouter } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Signin.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
    this.setState({ [name]: event.target.value });
  };
  validate = () => {
    let message = "";
    if (!this.state.email.includes("@")) {
      message = " Please provide a proper email format";
    }
    if (message) {
      this.setState({ message });
      swal(message);
      return false;
    }
    return true;
  };
  onSubmit = event => {
    event.preventDefault();
    let isValid = this.validate();
    if (isValid) {
      const { email, password } = this.state;
      axios
        .post(process.env.REACT_APP_BASE_URL + "user/signin", {
          email,
          password
        })
        .then(response => {
          if (response.data.status === 200) {
            this.setState({ success: true, message: response.data.message });
            swal(this.state.message);
            sessionStorage.setItem("userID", response.data.userData._id);
            this.props.onLogin();
            this.props.history.push("/profile");
          } else {
            this.setState({ success: false, error: response.data.message });
            swal(this.state.error);
          }
        });
    }
  };
  render() {
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
              type="Password"
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
            <Link className="nav-link" to="/forgotpassword">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
