import React from "react";
import "./TopBar.css";
const TopBar = () => {
  return (
    <>
      <div className="topBar">
        {/* <div className="topBarInfo">
          <p>FREE SHIPPING</p>
          <span>All orders over $75 USD (Canada $125 CAD)</span>
        </div> */}
        <div className="topBarInfo">
          <p>LIFETIME WARRANTY</p>
          <span>90 Day Returns</span>
        </div>
        {/* <div className="topBarInfo">
          <p>PEOPLE LOVE US</p>
          <span>Over 6,600 Reviews</span>
        </div> */}
      </div>
    </>
  );
};

export default TopBar;
