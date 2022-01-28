import React, { useEffect } from 'react';
import './Login.css';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

export default function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div className="login-body">
        <div className="login-div">
          <div className="login-heading">
            <p>LOGIN</p>
          </div>
          <div className="login-detail">
            <p>E-Mail</p>
            {/* <br /> */}
            <input
              type="text"
              id="fname"
              name="fname"
              // onChange={(event) => alert(event.target.value)}
            />
          </div>
          <div className="login-detail">
            <div className="login-detail-password">
              <p>PASSWORD</p>
              <Link to="#">Forgot password?</Link>
            </div>

            <input
              type="password"
              id="fname"
              name="fname"
              // onChange={(event) => alert(event.target.value)}
            />
          </div>
          <div className="login-detail-signin">
            <Button variant="outlined">Sign In</Button>
          </div>

          <div className="login-detail-create-account">
            <Link to="/create-account">
              <Button variant="outlined">Create Account</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
