import React, { useEffect, useState } from "react";
import "./Menu.css";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
// import { SentimentVeryDissatisfiedSharp } from '@mui/icons-material';
//import { Turn as Hamburger } from "hamburger-react";

export default function Menu() {
  const [sidebar, setSidebar] = useState(false);
  const [islogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [, setMyData] = useState({});
  const HandleMenu = (toggled) => {
    if (toggled) {
      document.body.classList.add("fixed-position");
    } else {
      document.body.classList.remove("fixed-position");
    }
    setSidebar(toggled);
  };

  const getMe = async () => {
    console.log("Getting  me...");
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/getme`,
        {
          method: "GET",
          // credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = JSON.parse(await response.text());
      // alert(res.status);
      if (res.status === "success") {
        setIsLogin(true);
        setMyData(res.data);
        // alert(res.status);
      }
    } catch (err) {
      // console.log('Error', err);
      setIsLogin(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    getMe();
  }, []);

  function MyAccount() {
    if (loading) {
      // getMe();
      return <></>;
    }

    if (islogin) {
      return (
        <>
          <Link to="/my-account">
            <span>MY ACCOUNT</span>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login">
            <span>LOGIN</span>
          </Link>
        </>
      );
    }
  }

  return (
    <>
      <div>
        <div style={{ padding: ".8rem" }}>
          <MenuIcon
            onClick={() => HandleMenu(true)}
            style={{ fontSize: 35, cursor: "pointer" }}
          />
        </div>
        <div
          className={sidebar ? "navDiv active" : "navDiv"}
          onClick={() => HandleMenu(false)}
        ></div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={() => HandleMenu(false)}>
            <li className="navbar-toggle">
              <div className="menu-bars">
                <ClearIcon style={{ fontSize: 35, cursor: "pointer" }} />
              </div>
            </li>

            <li className="nav-text">
              <Link to="/">
                <span>HOME</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/shop">
                <span>SHOP</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/categorys">
                <span>CATEGORYS</span>
              </Link>
            </li>

            {/* <li className="nav-text">
              <Link to="/up-coming-workshops">
                <span>UP COMING WORKSHOPS</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/previous-workshops">
                <span>PREVIOUS WORKSHOPS</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/all-workshops">
                <span>ALL WORKSHOPS</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/product-suggestion">
                <span>PRODUCT SUGGESTION</span>
              </Link>
            </li> */}
            {/* <li className="nav-text">
              <Link to="/our-shop-profile">
                <span>OUR SHOP PROFILE</span>
              </Link>
            </li> */}
            <li className="nav-text">
              <Link to="/contact-us">
                <span>CONTACT US</span>
              </Link>
            </li>

            <li className="nav-text">
              <MyAccount />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
