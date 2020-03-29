import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import "./changepassword.css";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      oldpassword: "",
      newpassword: "",
      success: false,
      message: "",
      error: ""
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  onSubmit = event => {
    event.preventDefault();
    let userID = sessionStorage.getItem("userID");
    const { oldpassword, newpassword } = this.state;
    const body = {
      userId: userID,
      oldPassword: oldpassword,
      newPassword: newpassword
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "user/changepassword", body)
      .then(response => {
        if (response.data.status === 200) {
          this.setState({ success: true, message: response.data.message });
          swal(this.state.message);
          this.props.history.push("/profile");
        } else {
          this.setState({ success: false, error: response.data.message });
          swal(this.state.error);
        }
      });
  };
  render() {
    return (
      <div className="changepasswordincontainer">
        <div className="changepasswordinformlayout">
          <div>
            <TextField
              className={"textField"}
              type="Password"
              label="Old Password"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange("oldpassword")}
              value={this.state.oldpassword}
            />
          </div>
          <div>
            <TextField
              className={"textField"}
              type="Password"
              label="New Password"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange("newpassword")}
              value={this.state.newpassword}
            />
          </div>
          <div className={"button"}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.onSubmit}
            >
              Change Password
            </Button>
          </div>
          <div className="forgotpassword">
            <Link className="nav-link" to="/forgotpassword">
              Cant remember your password ?
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default ChangePassword;
