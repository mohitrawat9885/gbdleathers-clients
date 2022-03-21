import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Login.css';
import Button from '@mui/material/Button';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { useAlert } from "react-alert";

import { Loading } from '../../../GlobalState';

export default function ResetPassword() {
  const [, setPageLoading] = React.useContext(Loading)
  const alert = useAlert();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let navigate = useNavigate();
  const { passwordToken } = useParams();
  const [password, setPassword] = useState('');

  const [passwordConfirm, setPasswordConfirm] = useState('');

  const ResetPassword = async () => {
    if (!password) {
      alert.show('Please provide password!');
      return;
    }
    if (!passwordConfirm || !(password === passwordConfirm)) {
      alert.show('Password do not match with confirm password!');
      return;
    }
    setPageLoading(true)
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/resetPassword/${passwordToken}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password,
            passwordConfirm,
          }),
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        alert.success('Password reset successfully!');
        setPageLoading(false)
        navigate('/');
       
        // console.log(res);
      } else {
        alert.error(res.message);
        setPageLoading(false)
      }
    } catch (error) {
      // console.log(error);
      setPageLoading(false)
      alert.error('Something went wrong please try again!');
    }
  };

  return (
    <>
      <Header />
      <div className="login-body">
        <div className="login-div">
          <div className="login-heading">
            <p>RESET PASSWORD</p>
          </div>
          <br />

          <div className="login-detail">
            <div className="login-detail-password">
              <p>PASSWORD</p>
            </div>

            <input
              type="password"
              id="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="login-detail">
            <div className="login-detail-password">
              <p>CONFIRM PASSWORD</p>
            </div>

            <input
              type="password"
              id="passwordcONFIRM"
              name="passwordcONFIRM"
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
          </div>
          <div className="login-detail-signin">
            <Button variant="outlined" onClick={() => ResetPassword()}>
              RESET PASSWORD
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
