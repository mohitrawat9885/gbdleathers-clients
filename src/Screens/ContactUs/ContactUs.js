import React, {  useEffect } from 'react';
import './ContactUs.css';
// import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import MuiPhoneNumber from "material-ui-phone-number";

// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";
// import "react-notifications/lib/notifications.css";

function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div className="contactus-div">
        <div className="contactus-form">
          <div className="contactus-heading">
            <p>Contact Us</p>
          </div>
          <br />
          <br />
          <div className="contactus-input">
            <p>NAME</p>
            <input type="text" id="fname" name="fname" />
            <br />
          </div>
          <br />

          <div className="contactus-input">
            <p>E-Mail</p>
            <input type="text" id="fname" name="fname" />
          </div>
          <br />
          <div className="contactus-input">
            <p>Message</p>
            <div className="message_div">
              <textarea name="message" rows="10" cols="30"></textarea>
            </div>
          </div>

          <br />
          <br />
          <div className="send_button_div">
            <Button variant="outlined">Send</Button>
          </div>
        </div>
        <br />
        <div className="contact_address_div">
          <div className="contact_address_tag">
            <p>Directly Contact Us</p>
          </div>
          <br />
          <div className="address_tag">
            <div className="address_tags">
              <p>ADDRESS</p>
            </div>
            <p>Doha-Qatar</p>
            <br />
            <br />

            <div className="address_tags">
              <p>PHONE NUMBER</p>
            </div>
            <p>+91 7895995686</p>
            <br />
            <br />

            <div className="address_tags">
              <p>EMAIL ADDRESS</p>
            </div>
            <p>customer@gbdleathers.com</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ContactUs;
