import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

export default function Signup() {
  let navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // const classes = useStyles();
  const [first_name, setFirsetName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async () => {
    try {
      const response = await fetch(
        '/api/v1/gbdleathers/client/customer/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            passwordConfirm: password,
          }),
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        navigate('/');
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert('Something went wrong!');
    }
  };

  return (
    <>
      <Header />
      <div className="signup-body">
        <div className="signup-div">
          <div className="signup-heading">
            <p>Create Account</p>
          </div>
          <div className="signup-detail">
            <p>FIRSE NAME</p>
            <input
              type="text"
              id="fname"
              name="fname"
              onChange={(event) => setFirsetName(event.target.value)}
            />
          </div>
          <div className="signup-detail">
            <p>LAST NAME</p>
            <input
              type="text"
              id="lname"
              name="lname"
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="signup-detail">
            <p>E-Mail</p>
            <input
              type="text"
              id="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="signup-detail">
            <div className="signup-detail-password">
              <p>NEW PASSWORD</p>
            </div>

            <input
              type="password"
              id="pass"
              name="pass"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="signup-detail">
            <Button variant="outlined" onClick={() => signup()}>
              Sign Up
            </Button>
          </div>
          <div className="signup-detail-have-account">
            <Link to="/login">
              <Button variant="outlined">Already have Account ?</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
