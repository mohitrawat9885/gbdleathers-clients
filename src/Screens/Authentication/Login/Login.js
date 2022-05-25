import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

import { useAlert } from "react-alert";
import { Loading } from "../../../GlobalState";

export default function Login() {
  const [, setPageLoading] = React.useContext(Loading);
  const alert = useAlert();
  const [forgotPassword, setForgotPassword] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");

  const [forgotSubmit, setForgotSubmit] = useState("SUBMIT");

  const login = async () => {
    try {
      setPageLoading(true);
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        alert.success("Welcome! You are now login.");
        setPageLoading(false);
        navigate("/");
        // console.log(res);
      } else {
        alert.error(res.message);
        setPageLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setPageLoading(false);
      alert.error("Something went wrong please try again!");
    }
  };
  const ForgotPassword = async () => {
    try {
      if (!email) {
        alert.show("Please provide email!");
        return;
      }
      setPageLoading(true);
      setForgotSubmit("Loading...");
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/forgotPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        alert.show(
          "Password Reset link is send to your entered email account!"
        );
        setPageLoading(false);
        navigate("/");
        // console.log(res);
      } else {
        alert.error(res.message);
        setPageLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setPageLoading(false);

      alert.show("Something went wrong please try again!");
    }
    setForgotSubmit("SUBMIT");
  };

  function GetLoginDiv() {
    if (forgotPassword === true) {
      return (
        <>
          <div className="login-div">
            <div className="login-heading">
              <p>ENTER EMAIL</p>
            </div>
            <br />
            <div className="login-detail">
              <p>E-Mail</p>
              {/* <br /> */}
              <input
                type="email"
                id="emai"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="login-detail-signin-forgot">
              <Button
                variant="outlined"
                onClick={() => {
                  ForgotPassword();
                }}
              >
                {forgotSubmit}
              </Button>
            </div>
            <br />

            <div className="login-detail-create-account-forgot">
              <p onClick={() => setForgotPassword(false)}>
                <Button variant="outlined">Cancel</Button>
              </p>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="login-div">
            <div className="login-heading">
              <p>LOGIN</p>
            </div>
            <div className="login-detail">
              <p>E-Mail</p>
              {/* <br /> */}
              <input
                type="email"
                id="emai"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="login-detail">
              <div className="login-detail-password">
                <p>PASSWORD</p>
                <span onClick={() => setForgotPassword(true)}>
                  Forgot password ?
                </span>
              </div>

              <input
                type="password"
                id="password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="login-detail-signin">
              <Button variant="outlined" onClick={() => login()}>
                Sign In
              </Button>
            </div>

            <div className="login-detail-create-account">
              <Link to="/create-account">
                <Button variant="outlined">Create Account</Button>
              </Link>
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <Header />
      <div className="login-body">{GetLoginDiv()}</div>
      <Footer />
    </>
  );
}
