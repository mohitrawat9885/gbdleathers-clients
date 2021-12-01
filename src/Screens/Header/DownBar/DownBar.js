import React, { useState } from "react";
import { Link } from "react-router-dom";
import UpDownKey from "./UpDownKey/UpDownKey";
import "./DownBar.css";
import "./DownBarMobile.css";

const data = [
  "WALLETS",
  "BELTS",
  "TECH",
  "DIY KITS",
  "WATCH STRAPS",
  "NOTEBOOK COVERS",
  "EVERYTHINGS ELSE",
  "GIFT CARD",
];

const DownBar = () => {
  // alert(data.length);
  const [keyStatus, setKeyStatus] = useState("down");
  const TonggleKeyStatus = () => {
    if (keyStatus == "up") {
      document.getElementById("downBar-mobile-id").style.height = "0px";
      setKeyStatus("down");
    } else {
      document.getElementById("downBar-mobile-id").style.height =
        data.length * 3.5 + "rem";
      setKeyStatus("up");
    }
  };
  return (
    <>
      <div className="downDiv">
        <nav className="downBar">
          <ul>
            {data.map((d) => (
              <Link to={`/category/${d}`}>
                <li className="down-text">
                  <p>{d}</p>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>

      <div className="downDiv-mobile">
        <div
          className="downBar-switch-menu-mobile"
          onClick={() => TonggleKeyStatus()}
        >
          <UpDownKey keyStatus={keyStatus} />
        </div>
        <nav id="downBar-mobile-id" className="downBar-mobile">
          <ul id="downBar-mobile-ul-id" className="downBar-mobile-ul">
            {data.map((d) => (
              <Link to={`/category/${d}`} onClick={() => TonggleKeyStatus()}>
                <li className="down-text-mobile">
                  <p>{d}</p>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
      {/* 
      <nav className="test">
        <label for="touch">
          <h1>titre</h1>
        </label>
        <input type="checkbox" id="touch" />

        <ul class="slide">
          <li>
            <a href="#">Lorem Ipsum</a>
          </li>
          <li>
            <a href="#">Lorem Ipsum</a>
          </li>
          <li>
            <a href="#">Lorem Ipsum</a>
          </li>
          <li>
            <a href="#">Lorem Ipsum</a>
          </li>
        </ul>
      </nav> */}
    </>
  );
};

export default DownBar;
