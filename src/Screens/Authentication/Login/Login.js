import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

export default function Login() {
  const [forgotPassword, setForgotPassword] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');

  const [forgotSubmit, setForgotSubmit] = useState('SUBMIT');

  const login = async () => {
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        navigate('/');
        // console.log(res);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong please try again!');
    }
  };
  const ForgotPassword = async () => {
    try {
      if (!email) {
        alert('Please provide email!');
        return;
      }
      setForgotSubmit('Loading...');
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/forgotPassword`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        alert('Password Reset link is send to your entered email account!');
        navigate('/');
        // console.log(res);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong please try again!');
    }
    setForgotSubmit('SUBMIT');
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
