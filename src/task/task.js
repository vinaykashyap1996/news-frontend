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
            <CardContent
              style={{ width: "348px", height: "400px", overflow: "auto" }}
            >
              <p style={{ padding: "10px" }}>Dear participant,</p>
              <p style={{ padding: "10px" }}>
                {" "}
                Thank you for participating in our task. The aim of the task is
                to annotate news on their believability according to your point
                of view. The news are in politics domain. They were collected
                from fake news sources, legit sources, and satiric sources. They
                were published in between 2016-2019.
              </p>
              <p style={{ padding: "10px" }}>
                We have three questions for you:
              </p>
              <p style={{ padding: "10px" }}>
                In total, you will annotate 100 samples. You can track your
                progress. There might be cases when you can not rate. For
                example: the article is not in politics domain the article is
                not news there is a technical issue which prevents you annotate
                you rate the article mistakenly and want to rate one more time
                ... In such cases happen, we provide a bug report button which
                activate comment field for reporting the issue.{" "}
                <p style={{ padding: "10px" }}>RULES:</p>{" "}
                <p style={{ padding: "10px" }}>
                  1- You can rate the news only once. If you mistakenly
                  annotate, please use bug report button and write the issue.
                </p>
                <p style={{ padding: "10px" }}>
                  {" "}
                  2- If you are bored from the task, you can sign out the
                  framework and sign in again. We save your progress.
                </p>
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
