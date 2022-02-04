import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');

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
              type="email"
              id="emai"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="login-detail">
            <div className="login-detail-password">
              <p>PASSWORD</p>
              <Link to="#">Forgot password?</Link>
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
      </div>
      <Footer />
    </>
  );
}
