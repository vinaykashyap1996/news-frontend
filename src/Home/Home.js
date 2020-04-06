import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";
// import Newspaper from '../Images/newpaper.jpeg'

const Home = memo(() => {
  let history = useHistory();
  return (
    <div className="Container">
      {
        <button
          className="button"
          onClick={history => {
            history.push("/signup");
          }}
        >
          Register
        </button>
      }
    </div>
  );
});

export default Home;
