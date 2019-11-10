import React, { Component } from "react";
import "./profile.css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import axios from "axios";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      setExpanded: false,
      firstLetter: "",
      newsUrl: [],
      success: false,
      currentIndex: 0,
      pIndex: 0,
      bIndex: 0,
      srcName: "",
      date: "",
      srcURL: "",
      random: 0
    };
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_BASE_URL + "news/getnews")
      .then(response => {
        if (response.status !== 200) {
          this.setState({ success: true, message: response.data.message });
        } else {
          this.setState({
            newsUrl: response.data.results,
            srcURL: response.data.results[this.state.currentIndex].url,
            date: response.data.results[this.state.currentIndex].date
              ? new Date(
                  response.data.results[this.state.currentIndex].date
                ).toDateString()
              : "",
            firstLetter: response.data.results[
              this.state.currentIndex
            ].author.charAt(0),
            srcName: response.data.results[this.state.currentIndex].author
          });
        }
      });
  }

  nextItem = () => {
    let curIndex = this.state.currentIndex;
    let newsUrlLength = this.state.newsUrl.length;
    curIndex = curIndex + 1;
    curIndex = curIndex % newsUrlLength; // when we implement back button
    let srcURL = this.state.newsUrl[curIndex].url;
    let date = this.dateFormat(curIndex);
    let firstLetter = this.displayFirstLetter(curIndex);
    let srcName = this.state.newsUrl[curIndex].author;
    this.setState({
      srcURL: srcURL,
      pIndex: 0,
      bIndex: 0,
      currentIndex: curIndex,
      random: this.state.random + 1,
      date: date,
      firstLetter: firstLetter,
      srcName: srcName
    });
  };

  prevItem = () => {
    // when we implement back button
    if (this.state.currentIndex === 0) {
      this.state.currentIndex = this.state.newsUrl.length;
    }
    this.state.currentIndex = this.state.currentIndex - 1;
    let srcURL = this.state.newsUrl[this.state.currentIndex].url;
    this.setState({
      srcURL: srcURL
    });
  };

  nextButton = () => {
    let storageUserID = sessionStorage.getItem("userID");
    let body = {
      userId: storageUserID,
      newsId: this.state.newsUrl[this.state.currentIndex]._id,
      bi: this.state.bIndex,
      pk: this.state.pIndex
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "rating/ratingpost", body)
      .then(response => {
        if (response.status !== 200) {
          this.setState({ success: true, message: response.data.message });
        } else {
        }
      });
    this.nextItem();
  };

  handleChange = name => (e, value) => {
    this.setState({
      [name]: value
    });
  };

  displayFirstLetter = index => {
    let firstLetter = "";
    firstLetter = this.state.newsUrl[index].author;
    firstLetter = firstLetter.charAt(0).toUpperCase();
    return firstLetter;
  };

  dateFormat = index => {
    let srcDate = this.state.newsUrl[index].date;
    srcDate = srcDate ? new Date(srcDate).toDateString() : null;
    return srcDate;
  };

  render() {
    let frameContent = "";
    if (this.state.newsUrl && this.state.newsUrl.length > 0) {
      frameContent = (
        <CardContent>
          <iframe
            key={this.state.random}
            src={this.state.srcURL}
            is="x-frame-bypass"
            width="455px"
            height="500px"
          ></iframe>
        </CardContent>
      );
    }

    return (
      <div className="ProfileContainer">
        <div className="profileLayout">
          <Card className={"card"}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={"avatar"}>
                  {this.state.firstLetter}
                </Avatar>
              }
              title={this.state.srcName}
              subheader={this.state.date}
            />
            <CardContent className="MuiCardContent-root:last-child ">
              {frameContent}
            </CardContent>
          </Card>
          <div className="buttoncontainer">
            <div>
              <Typography id="discrete-slider-custom" gutterBottom>
                Believability Index (BI)
              </Typography>
              <Slider
                defaultValue={0}
                aria-labelledby="discrete-slider-custom"
                step={10}
                valueLabelDisplay="auto"
                onChange={this.handleChange("bIndex")}
                value={this.state.bIndex}
              />
            </div>
            <div>
              <Typography id="discrete-slider-custom" gutterBottom>
                Prior Knowledge (PK)
              </Typography>
              <Slider
                defaultValue={0}
                aria-labelledby="discrete-slider-custom"
                step={10}
                valueLabelDisplay="auto"
                onChange={this.handleChange("pIndex")}
                value={this.state.pIndex}
              />
            </div>
          </div>
          {/* <div className="button-left">
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                component="span"
                className={"button"}
                onClick={() => this.nextButton()}
              >
                Next
              </Button>
            </label>
          </div> */}
          <div>
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                component="span"
                className={"button"}
                onClick={() => this.nextButton()}
              >
                Next
              </Button>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
