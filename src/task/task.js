import React, { useState } from "react";
import "./task.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useToasts } from "react-toast-notifications";
import axios from "axios";

const Task = () => {
  const { addToast } = useToasts();
  const [errorMessage, setErrorMessage] = useState("");
  let history = useHistory();
  const Taskhandler = value => {
    let taskValue = value;
    sessionStorage.setItem("Taskvalue", taskValue);
    const body = {
      userId: sessionStorage.getItem("userID"),
      task: taskValue
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "user/taskupdate", body)
      .then(response => {
        if (response.data.status === 200) {
          setErrorMessage(response.data.message);
          history.push("/language");
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
  };
  return (
    <div>
      <div className="taskcontainer">
        <div className="tasklayout">
          <Card>
            <CardContent style={{ width: "348px", height: "400px" }}>
              <p style={{ padding: "10px" }}>
                welcome! we ask you to read carefully the news in politics and
                to rate believability of an event discussed in the news and to
                rate the prior knowledge on the event.
              </p>
            </CardContent>
          </Card>
          <div style={{ padding: "10px" }}>
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                component="span"
                value="1"
                id="myBtn"
                className="button"
                onClick={() => {
                  Taskhandler("1");
                }}
              >
                Next
              </Button>
            </label>
          </div>
        </div>
        {/* <div className="task2">
          <Card>
            <CardContent style={{ width: "350px", height: "400px" }}>
              <p>
                Research on the Mahābhārata has put an enormous effort into
                recognizing and dating layers within the text. Some elements of
                the present Mahābhārata can be traced back to Vedic times.[18]
                The background to the Mahābhārata suggests the origin of the
                epic occurs "after the very early Vedic period" and before "the
                first Indian 'empire' was to rise in the third century B.C."
              </p>
            </CardContent>
          </Card>
          <div style={{ padding: "10px" }}>
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                component="span"
                id="myBtn2"
                value="2"
                className="button"
                onClick={() => {
                  Taskhandler("2");
                }}
              >
                Task2
              </Button>
            </label>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Task;
