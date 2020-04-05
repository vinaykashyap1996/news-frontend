import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import axios from "axios";
import swal from "sweetalert";

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
  { value: "tl", label: "unknown" },
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

function Language() {
  const { addToast } = useToasts();
  const [errorMessage, setErrorMessage] = useState("");

  const [language, setLanguage] = useState("");

  const handleChange = event => {
    setLanguage(event.target.value);
  };
  let history = useHistory();

  const clickhandler = () => {
    let userID = sessionStorage.getItem("userID");
    const body = {
      userId: userID,
      language: language
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "user/categoryupdate", body)
      .then(response => {
        if (response.data.status === 200) {
          setErrorMessage(response.data.message);
          swal(errorMessage);
          history.push("/category");
        } else {
          setErrorMessage(response.data.message);
          addToast(errorMessage, {
            appearance: "error",
            autoDismiss: true
          });
        }
      });
  };
  return (
    <div className={"languageincontainer"}>
      <div className={"languageinlayout"}>
        <div>
          <TextField
            select
            label="Native select"
            value={language}
            onChange={handleChange}
            helperText="Please select your Language"
            variant="outlined"
          >
            {languages
              .map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
              .sort()}
          </TextField>
        </div>
        <div>
          <Button variant="outlined" color="secondary" onClick={clickhandler}>
            select
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Language;
