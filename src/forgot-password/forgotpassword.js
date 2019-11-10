import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./forgotpassword.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      success: false,
      message: ""
    };
  }
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  submitclick = event => {
    event.preventDefault();
    const email = this.state.email;
    axios
      .post(process.env.REACT_APP_BASE_URL + "user/forgotpassword", { email })
      .then(response => {
        if (response.status === 200) {
          this.setState({ success: true, message: response.data.message });
        } else {
          this.setState({ success: false, message: response.data.message });
        }
      });
  };
  render() {
    if (this.state.success) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="forgotconatiner">
        <div className="forgotlayout">
          <p className="title">Forgot your password ?</p>
          <span className="jss44S"></span>
          <p>
            Enter your email address below and we'll send you a link to reset
            your password.
          </p>
          <div>
            <TextField
              className={"textField"}
              label="Email"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange("email")}
              value={this.state.email}
            />
          </div>
          <div>
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.submitclick}
            >
              SEND RESET LINK
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
