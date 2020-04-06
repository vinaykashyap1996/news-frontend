import React, { useState, memo } from "react";
import "./reportbug.css";
import swal from "sweetalert";
import { useToasts } from "react-toast-notifications";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const ReportBug = memo(() => {
  const { addToast } = useToasts();
  const [feedback, setFeedBack] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const feedBackHandleChange = name => event => {
    setFeedBack(event.target.value);
  };
  let history = useHistory();
  let params = useParams();

  const onSubmit = event => {
    event.preventDefault();
    let userID = sessionStorage.getItem("userID");
    const { feedback } = this.state;
    const body = {
      userId: userID,
      newsId: params.newsId,
      feedback: feedback
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "report/report", body)
      .then(response => {
        if (response.data.status === 200) {
          setMessage(response.data.message);
          swal(message);
          history.push("/profile");
        } else {
          setError(response.data.message);
          addToast(error, {
            appearance: "error",
            autoDismiss: true
          });
        }
      });
  };
  return (
    <div className="reportincontainer">
      <div className="reportinformlayout">
        <div>
          <TextField
            className={"textField"}
            label="Feedback"
            margin="normal"
            variant="outlined"
            onChange={feedBackHandleChange("feedback")}
            value={feedback}
          />
        </div>
        <div className={"button"}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onSubmit()}
          >
            Report
          </Button>
        </div>
      </div>
    </div>
  );
});

export default ReportBug;
