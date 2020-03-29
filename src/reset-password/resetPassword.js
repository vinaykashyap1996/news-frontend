import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./resetPassword.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class Reset extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      success: false
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  onSubmit = event => {
    event.preventDefault();
    const {
      match: { params }
    } = this.props;
    const { password } = this.state;
    const token = params.token;
    axios
      .post(process.env.REACT_APP_BASE_URL + "user/resetpassword/" + token, {
        password
      })
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
      <div className="resetcontainer">
        <div className="resetformlayout">
          <h1>RESET PASSWORD</h1>
          <span className="jss448"></span>
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
          <div className="btn">
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.onSubmit}
            >
              RESET PASSWORD
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Reset;
