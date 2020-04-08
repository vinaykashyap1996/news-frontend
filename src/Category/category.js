import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Category.css";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

const categories = [
  { value: "social media", label: "Social Media" },
  { value: "news post", label: "News Post" }
];
categories.sort((a, b) => (a.label > b.label ? 1 : -1));
function Category() {
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = event => {
    setCategory(event.target.value);
  };
  let history = useHistory();
  const getUserSelectedCategory = () => {
    let userID = sessionStorage.getItem("userID");
    axios
      .get(process.env.REACT_APP_BASE_URL + "user/userdetails?userId=" + userID)
      .then(response => {
        if (response.data.status === 200) {
          setCategory(response.data.results[0].category);
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
      category: category
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "user/categoryupdate", body)
      .then(response => {
        if (response.data.status === 200) {
          setErrorMessage(response.data.message);
          history.push("/profile");
        } else {
          setErrorMessage(response.data.message);
        }
      });
  };
  useEffect(() => {
    getUserSelectedCategory();
  }, []);
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
