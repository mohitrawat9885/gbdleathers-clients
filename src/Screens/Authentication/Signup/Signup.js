import React, { useEffect } from 'react';
import './Signup.css';
// import { TextField } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
// const useStyles = makeStyles(() => ({
//   loginBtn: {
//     "& > *": {
//       width: "100%",
//       height: "auto",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       color: "white",
//     },
//   },
//   signupBtn: {
//     "& > *": {
//       width: "100%",
//       height: "auto",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//   },
// }));
export default function Signup() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // const classes = useStyles();
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
              // onChange={(event) => alert(event.target.value)}
            />
          </div>
          <div className="signup-detail">
            <p>LAST NAME</p>
            <input
              type="text"
              id="fname"
              name="fname"
              // onChange={(event) => alert(event.target.value)}
            />
          </div>
          <div className="signup-detail">
            <p>E-Mail</p>
            <input
              type="text"
              id="fname"
              name="fname"
              // onChange={(event) => alert(event.target.value)}
            />
          </div>
          <div className="signup-detail">
            <div className="signup-detail-password">
              <p>NEW PASSWORD</p>
            </div>

            <input
              type="password"
              id="fname"
              name="fname"
              // onChange={(event) => alert(event.target.value)}
            />
          </div>
          <div className="signup-detail">
            <Button variant="outlined">Sign Up</Button>
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
