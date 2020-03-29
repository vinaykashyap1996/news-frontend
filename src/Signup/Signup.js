import React, { Component } from "react";
import swal from "sweetalert";

import "./Signup.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
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
    const isValid = this.validate();
    if (isValid) {
      const { firstName, lastName, email, password } = this.state;
      axios
        .post(process.env.REACT_APP_BASE_URL + "user/signup", {
          firstName,
          lastName,
          email,
          password
        })
        .then(response => {
          if (response.data.status === 200) {
            this.setState({ success: true, message: response.data.message });
            sessionStorage.setItem("userID", response.data.result._id);
            // this.props.onLogin();
            this.props.history.push("/profile");
            swal(this.state.message);
          } else {
            this.setState({ success: false, error: response.data.message });
            swal(this.state.error);
          }
        });
    }
  };
  render() {
    return (
      <div className="signupcontainer">
        <div className="signuplayout">
          <p className="title">Sign up</p>
          <span className="jss44S"></span>
          <p>
            <Link className="nav-link" to="/signin">
              Already have an account?
            </Link>
          </p>
          <div>
            <TextField
              className={"textField"}
              label="Firstname"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange("firstName")}
              value={this.state.firstName}
            />
            <span> </span>
            <TextField
              className={"textField"}
              label="Lastname"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange("lastName")}
              value={this.state.lastName}
            />
          </div>
          <div className="emailcontainer">
            <TextField
              name="Email"
              className={"textField"}
              label="Email"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange("email")}
              value={this.state.email}
            />
          </div>
          <div className="passwordcontainer">
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
          <div>
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.onSubmit}
            >
              SIGN UP
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
