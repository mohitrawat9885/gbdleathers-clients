import React, { useEffect } from "react";
import "./UpDownKey.scss";

export default function UpDownKey(params) {
  useEffect(() => {
    if (params.keyStatus === "down") {
      document.querySelector(".arrow-icon").classList.add("open");
    } else {
      document.querySelector(".arrow-icon").classList.remove("open");
    }
  });

  return (
    <>
      {/* <div className="UpDownKey-div"> */}
      <span className="arrow-icon">
        <span className="left-bar"></span>
        <span className="right-bar"></span>
      </span>
      {/* </div> */}
    </>
  );
}
