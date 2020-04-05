import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import axios from "axios";
import swal from "sweetalert";
import "./Category.css";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

const categories = [
  { value: "social media", label: "Social Media" },
  { value: "news post", label: "News Post" }
];

function Category() {
  const { addToast } = useToasts();
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = event => {
    setCategory(event.target.value);
  };
  let history = useHistory();
  const clickhandler = () => {
    let userID = sessionStorage.getItem("userID");
    const body = {
      userId: userID,
      category: category
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "user/categoryupdate", body)
      .then(response => {
        if (response.data.status === 200) {
          setErrorMessage(response.data.message);
          swal(errorMessage);
          history.push("/profile");
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
            value={category}
            onChange={handleChange}
            helperText="Please News Category"
            variant="outlined"
          >
            {categories.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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

export default Category;
