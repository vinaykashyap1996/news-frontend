import React, { memo, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
// import GTranslateIcon from "@material-ui/icons/GTranslate";
import "./profile.css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import BugReportIcon from "@material-ui/icons/BugReport";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

const Profile = memo(() => {
  const { addToast } = useToasts();

  const [firstLetter, setFirstLetter] = useState("");
  const [allNewsIDs, setAllNewsIDs] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [pIndex, setPIndex] = useState(0);
  const [bIndex, setBIndex] = useState(0);
  const [srcName, setSrcName] = useState("");
  const [srcURL, setSrcURL] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentNewsId, setCurrentNewsId] = useState(0);
  const [open, setOpen] = useState(false);

  const getNewsHandler = useCallback(
    (newsIndex, data) => {
      const allNews = data || allNewsIDs;
      setCurrentNewsIndex(newsIndex);
      let storageUserID = sessionStorage.getItem("userID");
      if (allNews.length > 0) {
        let newsId = allNews.length > 0 ? allNews[newsIndex]._id : 0;
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
              setSrcName(IndivdualNews[0].source);
              let Fletter = IndivdualNews[0]
                ? IndivdualNews[0].source.charAt(0)
                : "";
              setFirstLetter(Fletter);
              let priorIndex =
                userData.length > 0 ? userData[0].priorknowledge : 0;
              let belivIndex =
                userData.length > 0 ? userData[0].belivibalityIndex : 0;
              setPIndex(priorIndex);
              setBIndex(belivIndex);
              setSrcURL(IndivdualNews[0].url);
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

  const bypassCheck = () => {
    if (srcName !== "youtube.com") {
      return "x-frame-bypass";
    } else {
      return "null";
    }
  };

  const backButton = () => {
    getNewsHandler(currentNewsIndex - 1);
  };
  const handlePindexChange = name => (e, value) => {
    setPIndex(value);
  };
  const handleBindexChange = name => (e, value) => {
    setBIndex(value);
  };
  return (
    <div className="ProfileContainer">
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
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={"avatar"}>
                {firstLetter}
              </Avatar>
            }
            title={srcName}
            subheader={publishedDate}
          />
          <CardContent className="MuiCardContent-root:last-child ">
            <CardContent>
              <iframe
                is={bypassCheck()}
                width="455px"
                height="500px"
                title={srcURL}
                key={srcURL}
                src={srcURL}
              ></iframe>
            </CardContent>
          </CardContent>
        </Card>
        <div className="buttoncontainer">
          <div>
            <Typography id="discrete-slider-custom" gutterBottom>
              Plausibility
            </Typography>
            <div></div>
            <Slider
              className="slider"
              defaultValue={0}
              aria-labelledby="discrete-slider-custom"
              step={1}
              min={0}
              max={4}
              onChange={handleBindexChange("Bindex")}
              valueLabelDisplay="on"
              value={bIndex}
            />
          </div>
          <div>
            <Typography id="discrete-slider-custom" gutterBottom>
              Prior Knowledge
            </Typography>
            <span />
            <Slider
              className="slider"
              defaultValue={0}
              aria-labelledby="discrete-slider-custom"
              step={1}
              min={0}
              max={4}
              onChange={handlePindexChange("Pindex")}
              valueLabelDisplay="on"
              value={pIndex}
            />
          </div>
        </div>
        <div className="buttongroup">
          {currentNewsIndex !== 0 && (
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
          )}
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
  );
});

export default Profile;
