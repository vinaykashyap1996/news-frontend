import React, { useState, memo } from "react";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import "./changepassword.css";
import { Link, useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const ChangePassword = memo(() => {
  const { addToast } = useToasts();

  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const oldPasswordHandleChange = name => event => {
    setOldPassword(event.target.value);
  };
  const newPasswordHandleChange = name => event => {
    setNewPassword(event.target.value);
  };
  let history = useHistory();
  const onSubmit = () => {
    let userID = sessionStorage.getItem("userID");
    const body = {
      userId: userID,
      oldPassword: oldpassword,
      newPassword: newpassword
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "user/changepassword", body)
      .then(response => {
        if (response.data.status === 200) {
          setMessage(response.data.message);
          addToast(response.data.message, {
            appearance: "error",
            autoDismiss: true
          });
          history.push("/profile");
        } else {
          setError(response.data.message);
          addToast(response.data.message, {
            appearance: "error",
            autoDismiss: true
          });
        }
      });
  };
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
            onChange={oldPasswordHandleChange("oldpassword")}
            value={oldpassword}
          />
        </div>
        <div>
          <TextField
            className={"textField"}
            type="Password"
            label="New Password"
            margin="normal"
            variant="outlined"
            onChange={newPasswordHandleChange("newpassword")}
            value={newpassword}
          />
        </div>
        <div className={"button"}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onSubmit()}
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
});

export default ChangePassword;
