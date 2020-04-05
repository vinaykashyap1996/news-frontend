import React, { Component } from "react";
import "./reportbug.css";
import swal from "sweetalert";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class ReportBug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: "",
      success: false,
      message: ""
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  onSubmit = event => {
    event.preventDefault();
    let userID = sessionStorage.getItem("userID");
    const { feedback } = this.state;
    const body = {
      userId: userID,
      newsId: this.props.match.params.newsId,
      feedback: feedback
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "report/report", body)
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
      <div className="reportincontainer">
        <div className="reportinformlayout">
          <div>
            <TextField
              className={"textField"}
              label="Feedback"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange("feedback")}
              value={this.state.feedback}
            />
          </div>
          <div className={"button"}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.onSubmit}
            >
              Report
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportBug;
