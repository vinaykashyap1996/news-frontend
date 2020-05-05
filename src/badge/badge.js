import React from "react";
import swal from "sweetalert";
import "./badge.css";
const Badge = props => {
  let value = parseInt(props.done);
  let total = parseInt(props.total);
  let scoreAt10 = Math.round((10 / 100) * total);
  let scoreAt30 = Math.round((30 / 100) * total);
  let scoreAt50 = Math.round((50 / 100) * total);
  let scoreAt70 = Math.round((70 / 100) * total);
  if (
    value >= scoreAt10 &&
    value < scoreAt30 &&
    value < scoreAt50 &&
    value < scoreAt70
  ) {
    swal({
      title: "Congrats , you have just reached Bronze",
      text: "Level 1",
      icon:
        "https://4.imimg.com/data4/HW/MI/MY-9647748/bronze-medal-500x500.jpg"
    });
    return (
      <div className="badgeContainer">
        <img
          className="Image-1"
          src="https://4.imimg.com/data4/HW/MI/MY-9647748/bronze-medal-500x500.jpg"
        />
      </div>
    );
  } else if (value >= scoreAt30 && value < scoreAt50 && value < scoreAt70) {
    return <div className="badgeContainer">hello 30</div>;
  } else if (value >= scoreAt50 && value < scoreAt70) {
    return <div className="badgeContainer">hello 50</div>;
  } else if (value >= scoreAt70 && value < total) {
    return <div className="badgeContainer">hello 70</div>;
  } else if (value === total) {
    return <div className="badgeContainer">Congrats,you reached the final</div>;
  }
  return null;
};
export default Badge;
