import React, { useState, memo } from "react";
import swal from "sweetalert";
import { withRouter, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Signin.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const Signin = memo(props => {
  const { addToast } = useToasts();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
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
      addToast(errorMessage, {
        appearance: "error",
        autoDismiss: true
      });
      // swal(errorMessage);
      return false;
    }
    return true;
  };
  let history = useHistory();
  const onSubmit = () => {
    let isValid = validate();
    if (isValid) {
      const body = {
        email: Email,
        password: Password
      };
      axios
        .post(process.env.REACT_APP_BASE_URL + "user/signin", body)
        .then(response => {
          if (response.data.status === 200) {
            setErrorMessage(response.data.message);
            swal(errorMessage);
            sessionStorage.setItem("userID", response.data.userData._id);
            props.onLogin();
            history.push("/profile");
          } else {
            setErrorMessage(response.data.message);
            addToast(errorMessage, {
              appearance: "error",
              autoDismiss: true
            });
            // swal(errorMessage);
          }
        });
    }
  };

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
            onChange={emailhandleChange("email")}
            value={Email}
          />
        </div>
        <div>
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
        <div className={"button"}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onSubmit()}
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
});

export default withRouter(Signin);
