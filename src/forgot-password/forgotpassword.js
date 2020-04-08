import React, { memo, useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { Redirect } from "react-router-dom";
import "./forgotpassword.css";
import axios from "axios";
import swal from "sweetalert";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const ForgotPassword = memo(() => {
  const { addToast } = useToasts();
  const [Email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleChange = name => event => {
    setEmail(event.target.value);
  };
  const validate = () => {
    let message = "";
    if (!Email.includes("@")) {
      message = " Please provide a proper Email format";
    }
    if (message) {
      setError(message);
      setSuccess(false);
      addToast(message, {
        appearance: "error",
        autoDismiss: true
      });
      return false;
    }
    return true;
  };
  const submitclick = () => {
    let isValid = validate();
    if (isValid) {
      const email = Email;
      axios
        .post(process.env.REACT_APP_BASE_URL + "user/forgotpassword", { email })
        .then(response => {
          if (response.status === 200) {
            setMessage(response.data.message);
            addToast(response.data.message, {
              appearance: "success",
              autoDismiss: true
            });
            setSuccess(true);
          } else {
            setError(response.data.message);
            setSuccess(false);
            addToast(response.data.message, {
              appearance: "error",
              autoDismiss: true
            });
          }
        });
    }
  };
  if (success) {
    return <Redirect to="/signin" />;
  }
  return (
    <div className="forgotconatiner">
      <div className="forgotlayout">
        <p className="title">Forgot your password ?</p>
        <span className="jss44S"></span>
        <p>
          Enter your Email address below and we'll send you a link to reset your
          password.
        </p>
        <div>
          <TextField
            className={"textField"}
            label="Email"
            margin="normal"
            variant="outlined"
            onChange={handleChange("Email")}
            value={Email}
          />
        </div>
        <div>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => submitclick()}
          >
            SEND RESET LINK
          </Button>
        </div>
      </div>
    </div>
  );
});

export default ForgotPassword;
