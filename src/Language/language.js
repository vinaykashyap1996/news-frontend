import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./language.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const languages = [
  { value: "en", label: "English" },
  { value: "ta", label: "Tamil" },
  { value: "es", label: "Spanish" },
  { value: "ko", label: "Koren" },
  { value: "it", label: "Italian" },
  { value: "de", label: "German" },
  { value: "pt", label: "Portuguese" },
  { value: "id", label: "Indonesian" },
  { value: "tl", label: "Tagalog" },
  { value: "fr", label: "French" },
  { value: "ar", label: "Arabic" },
  { value: "ru", label: "Russian" },
  { value: "nl", label: "Dutch" },
  { value: "pl", label: "Polish" },
  { value: "lt", label: "Lithuanian" },
  { value: "fi", label: "Finnish" },
  { value: "da", label: "Danish" },
  { value: "hu", label: "Hungarian" },
  { value: "uk", label: "Ukrainian" },
  { value: "et", label: "Estonian" },
  { value: "cs", label: "Czech" },
  { value: "sv", label: "Swedish" },
  { value: "sk", label: "Slovak" },
  { value: "ro", label: "Romanian" },
  { value: "no", label: "Norwegian" },
  { value: "sw", label: "Swahili" }
];
languages.sort((a, b) => (a.label > b.label ? 1 : -1));

const Language = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [language, setLanguage] = useState("");

  const handleChange = event => {
    setLanguage(event.target.value);
  };
  let history = useHistory();
  const getUserSelectedLanguage = () => {
    let userID = sessionStorage.getItem("userID");
    axios
      .get(process.env.REACT_APP_BASE_URL + "user/userdetails?userId=" + userID)
      .then(response => {
        if (response.data.status === 200) {
          setLanguage(response.data.results[0].language);
          setErrorMessage(response.data.message);
        } else {
          setErrorMessage(response.data.message);
        }
      });
  };
  const clickhandler = () => {
    let userID = sessionStorage.getItem("userID");
    const body = {
      userId: userID,
      language: language
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "user/languageupdate", body)
      .then(response => {
        if (response.data.status === 200) {
          setErrorMessage(response.data.message);
          if (history.location.query) {
            history.push("/profile");
          } else {
            history.push("/category");
          }
        } else {
          setErrorMessage(response.data.message);
        }
      });
  };
  useEffect(() => {
    getUserSelectedLanguage();
  }, []);
  return (
    <div className={"languageincontainer"}>
      <div className={"languageinlayout"}>
        <div>
          <TextField
            select
            label="Native select"
            value={language}
            onChange={handleChange}
            helperText="Please Select Your Language"
            variant="outlined"
          >
            {languages.map(option => (
              <option
                key={option.value}
                value={option.value}
                style={{ padding: "10px" }}
              >
                {option.label}
              </option>
            ))}
          </TextField>
        </div>
        <div>
          <Button variant="outlined" color="secondary" onClick={clickhandler}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Language;
