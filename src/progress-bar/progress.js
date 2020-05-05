import React from "react";
import "./progress.css";
const ProgressBar = props => {
  let value = props.done;
  let total = props.total;
  return (
    <div className="progress">
      <div
        className="progress-done"
        style={{
          width: value + "%",
          opacity: "1",
          alignItems: "center"
        }}
      >
        {value + " of " + total}
      </div>
    </div>
  );
};

export default ProgressBar;
