import React, { useState, memo } from "react";
import { useToasts } from "react-toast-notifications";
import "./signup.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const Signup = memo(props => {
  const { addToast } = useToasts();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const firstnamehandleChange = name => (event, value) => {
    setFirstname(event.target.value);
  };
  const lastnamehandleChange = name => (event, value) => {
    setLastname(event.target.value);
  };
  const emailhandleChange = name => (event, value) => {
    setEmail(event.target.value);
  };
  const passwordhandleChange = name => (event, value) => {
    setPassword(event.target.value);
  };
  const validate = () => {
    let message = "";
    if (!Email.includes("@")) {
      message = " Please provide a proper email format";
    }
    if (message) {
      setErrorMessage(message);
      addToast(message, {
        appearance: "error",
        autoDismiss: true
      });
      return false;
    }
    return true;
  };
  let history = useHistory();
  const onSubmit = () => {
    const isValid = validate();
    if (isValid) {
      const body = {
        firstName: firstName,
        lastName: lastName,
        email: Email,
        password: Password
      };
      axios
        .post(process.env.REACT_APP_BASE_URL + "user/signup", body)
        .then(response => {
          if (response.data.status === 200) {
            setErrorMessage(response.data.message);
            sessionStorage.setItem("userID", response.data.result._id);
            props.onLogin();
            history.push("/task");
            addToast(response.data.message, {
              appearance: "success",
              autoDismiss: true
            });
          } else {
            setErrorMessage(response.data.message);
            addToast(response.data.message, {
              appearance: "error",
              autoDismiss: true
            });
          }
        });
    }
  };
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
        <div className="firstnamediv">
          <TextField
            className={"textField"}
            label="Firstname"
            margin="normal"
            variant="outlined"
            onChange={firstnamehandleChange("firstName")}
            value={firstName}
          />
          <span> </span>
          <TextField
            className={"textField"}
            label="Lastname"
            margin="normal"
            variant="outlined"
            onChange={lastnamehandleChange("lastName")}
            value={lastName}
          />
        </div>
        <div className="emailcontainer">
          <TextField
            name="Email"
            className={"textField"}
            label="Email"
            margin="normal"
            variant="outlined"
            onChange={emailhandleChange("email")}
            value={Email}
          />
        </div>
        <div className="passwordcontainer">
          <TextField
            className={"textField"}
            type="Password"
            label="Password"
            margin="normal"
            variant="outlined"
            onChange={passwordhandleChange("password")}
            value={Password}
          />
        </div>
        <div>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              onSubmit();
            }}
          >
            SIGN UP
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Signup;
