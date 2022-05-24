import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UpDownKey from "./UpDownKey/UpDownKey";
import "./DownBar.css";
import "./DownBarMobile.css";

const DownBar = () => {
  const [, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  const getAllCategorys = async (quaryString) => {
    try {
      const response = await fetch(
        `${global.api}/client/category?${quaryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        setCategoryList(res.data);
      }
    } catch (error) {
      setCategoryList([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllCategorys("?page=1&limit=6");
  }, []);

  // alert(data.length);
  const [keyStatus, setKeyStatus] = useState("down");
  const TonggleKeyStatus = () => {
    if (keyStatus === "up") {
      document.getElementById("downBar-mobile-id").style.height = "0px";
      setKeyStatus("down");
    } else {
      document.getElementById("downBar-mobile-id").style.height =
        categoryList.length * 3.5 + "rem";
      setKeyStatus("up");
    }
  };
  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 400);
  }

  return (
    <>
      <div className="downDiv">
        <nav className="downBar">
          <ul>
            {categoryList.map((category, index) => (
              <Link
                onClick={refreshPage}
                to={`/category/${category._id}`}
                key={index}
              >
                <li className="down-text">
                  <p>{category.name.toUpperCase()}</p>
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
            {categoryList.map((category, index) => (
              <Link
                to={`/category/${category._id}`}
                onClick={() => {
                  refreshPage();
                  // TonggleKeyStatus();
                }}
                key={index}
              >
                <li className="down-text-mobile">
                  <p>{category.name.toUpperCase()}</p>
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
