import React, { memo, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import "./newprofile.css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import BugReportIcon from "@material-ui/icons/BugReport";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import ProgressBar from "../progress-bar/progress";
import Badge from "../badge/badge";

const newProfile = memo(() => {
  const { addToast } = useToasts();
  const [firstLetter, setFirstLetter] = useState("");
  const [allNewsIDs, setAllNewsIDs] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [pIndex, setPIndex] = useState("");
  const [bIndex, setBIndex] = useState("");
  const [srcHeadline, setSrcHeadline] = useState("");
  const [srcText, setText] = useState("");
  const [comment, setComment] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentNewsId, setCurrentNewsId] = useState(0);
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [total, setTotal] = useState(0);

  const getNewsHandler = useCallback(
    (newsIndex, data) => {
      const allNews = data || allNewsIDs;
      setCurrentNewsIndex(newsIndex);
      let storageUserID = sessionStorage.getItem("userID");
      if (allNews.length > 0) {
        let newsId = allNews.length > 0 ? allNews[newsIndex]._id : 0;
        setCounter(newsIndex + 1);
        setCurrentNewsId(newsId);
        axios
          .get(
            process.env.REACT_APP_BASE_URL +
              "news/getnews?newsId=" +
              newsId +
              "&userId=" +
              storageUserID
          )
          .then(response => {
            if (response.status !== 200) {
              setErrorMessage(response.data.message);
            } else {
              let IndivdualNews = [...response.data.newsData];
              let userData = [...response.data.userData];
              setPublishedDate(
                IndivdualNews[0].published_date
                  ? new Date(IndivdualNews[0].published_date).toDateString()
                  : ""
              );
              setSrcHeadline(IndivdualNews[0].title);
              let Fletter = IndivdualNews[0]
                ? IndivdualNews[0].source.charAt(0)
                : "";
              setFirstLetter(Fletter);
              let priorIndex =
                userData.length > 0 ? userData[0].priorknowledge : -1;
              let belivIndex =
                userData.length > 0 ? userData[0].belivibalityIndex : -1;
              let comments = userData.length > 0 ? userData[0].comment : "";
              setComment(comments);
              setPIndex(priorIndex.toString());
              setBIndex(belivIndex.toString());
              setText(IndivdualNews[0].content.trim("\n"));
            }
          });
      }
    },
    [allNewsIDs]
  );
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const getAllNewsIDsHandler = useCallback(() => {
    let storageUserID = sessionStorage.getItem("userID");
    if (allNewsIDs.length === 0) {
      axios
        .get(
          process.env.REACT_APP_BASE_URL +
            "news/sessiondata?userId=" +
            storageUserID
        )
        .then(response => {
          if (response.status !== 200) {
            setErrorMessage(response.data.message);
          } else {
            if (response.data.newsIds.length > 0) {
              setTotal(response.data.Total);
              let allNewsId = [...response.data.newsIds] || [];
              let allSessionData =
                response.data.sessionData &&
                response.data.sessionData.length > 0
                  ? [...response.data.sessionData]
                  : [];
              setAllNewsIDs(allNewsId || []);
              let newsIndex =
                allSessionData.length > 0 ? allSessionData.length - 1 : 0;
              getNewsHandler(newsIndex, allNewsId);
            } else {
              addToast("Please Select Another Category/Language", {
                appearance: "error",
                autoDismiss: true
              });
            }
          }
        });
    }
  }, [getNewsHandler, allNewsIDs.length]);

  const timeIntervalHandler = useCallback(() => {
    let startTime = 0;
    startTime = new Date().getTime();
    localStorage.setItem("StartTimer", startTime);
  }, []);

  const timeConversion = duration => {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  };

  useEffect(() => {
    getAllNewsIDsHandler();
    timeIntervalHandler();
  }, [getAllNewsIDsHandler, timeIntervalHandler]);

  let history = useHistory();

  const nextButton = () => {
    setCounter(counter + 1);
    let storageUserID = sessionStorage.getItem("userID");
    let endTime = 0;
    endTime = new Date().getTime();
    localStorage.setItem("EndTimer", endTime);
    let readingTime =
      localStorage.getItem("EndTimer") - localStorage.getItem("StartTimer");
    let conversionTime = timeConversion(readingTime);
    let body = {
      userId: storageUserID,
      newsId: currentNewsId,
      bi: bIndex,
      pk: pIndex,
      comment: comment,
      readingTime: conversionTime,
      flag: true
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "rating/ratingpost", body)
      .then(response => {
        if (response.status !== 200) {
          setErrorMessage(response.data.message);
        } else {
          getNewsHandler(currentNewsIndex + 1);
        }
      });
  };

  const backButton = () => {
    setCounter(counter - 1);
    getNewsHandler(currentNewsIndex - 1);
  };
  const handlePindexChange = event => {
    setPIndex(event.target.value);
  };
  const handleBindexChange = event => {
    setBIndex(event.target.value);
  };
  const commenthandleChange = name => event => {
    setComment(event.target.value);
  };

  return (
    <div>
      {/* <div className="TopContainer">
         <div className="BadgeLayout">
          <Badge done={counter} total={total} />
        </div>
        <div className="ProgressContainer">
          <ProgressBar done={counter} total={total} />
        </div>
      </div>  */}
      <div className="ProfileContainer">
        <div className="ProgressContainer">
          <ProgressBar done={counter} total={total} />
        </div>
        <div className="profileLayout">
          <div className={"button-right"}>
            <Tooltip
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              title="Report Bug"
            >
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={() => history.push(`/report/${currentNewsId}`)}
              >
                <BugReportIcon />
              </Button>
            </Tooltip>
          </div>
          <Card className={"card"}>
            <CardHeader title={srcHeadline} style={{ width: "557.23px" }} />
            <CardContent className="MuiCardContent-root:last-child ">
              <CardContent style={{ width: "557.23px", height: "507px" }}>
                <p style={{ padding: "10px 10px 0px 10px" }}>{srcText}</p>
              </CardContent>
            </CardContent>
          </Card>
          <div className="buttoncontainer">
            <div style={{ marginBottom: "12px" }}>
              <Typography
                id="discrete-slider-custom"
                style={{ fontSize: "larger" }}
                gutterBottom
              >
                Do you find this news believable?
              </Typography>
              <div style={{ marginBottom: "12px" }}></div>
              <FormControl className="formcontrol" component="fieldset">
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  value={bIndex}
                  onClick={handleBindexChange}
                >
                  <FormControlLabel
                    value="-1"
                    control={<Radio />}
                    label="Default"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="very unbelievable"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="unbelievable"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="neutral"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="believable"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="very believable"
                    labelPlacement="top"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <Typography
                id="discrete-slider-custom"
                style={{ fontSize: "larger" }}
                gutterBottom
              >
                Do you have prior knowledge about this article?
              </Typography>
              <div style={{ marginBottom: "12px" }}></div>
              <FormControl className="formcontrol" component="fieldset">
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  value={pIndex}
                  onClick={handlePindexChange}
                >
                  <FormControlLabel
                    value="-1"
                    control={<Radio />}
                    label="Default"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="very low"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="low"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="neutral"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="good"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="very good"
                    labelPlacement="top"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              className={"textField"}
              label="comment (optional)"
              margin="normal"
              variant="outlined"
              onChange={commenthandleChange("comment")}
              value={comment}
              autoComplete="off"
            />
          </div>
          <div className="buttongroup">
            {/* {currentNewsIndex !== 0 && (
              <div className="button-left">
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    className={"button"}
                    onClick={() => backButton()}
                  >
                    Back
                  </Button>
                </label>
              </div>
            )} */}
            {currentNewsIndex !== allNewsIDs.length - 1 && (
              <div>
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    className={"button"}
                    onClick={() => nextButton()}
                  >
                    Next
                  </Button>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default newProfile;
