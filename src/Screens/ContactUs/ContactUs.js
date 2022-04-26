import React, { useEffect, useState } from "react";
import "./ContactUs.css";
// import { TextField } from '@mui/material';
import Button from "@mui/material/Button";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useAlert } from "react-alert";
import { Loading } from "../../GlobalState";
// import MuiPhoneNumber from "material-ui-phone-number";

// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";
// import "react-notifications/lib/notifications.css";

function ContactUs() {
  const alert = useAlert();
  const [, setPageLoading] = React.useContext(Loading);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const contactUs = async () => {
    try {
      setPageLoading(true);
      const response = await fetch(`${global.api}/client/contact-us/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          number,
          message,
        }),
      });
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        setName("");
        setEmail("");
        setNumber("");
        setMessage("");
        window.scrollTo(0, 0);
        alert.success("Thanks for giving Your Informations.");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        alert.error(res.message);
      }
      setPageLoading(false);
    } catch (error) {
      alert.error("Please Try Again!");
      setPageLoading(false);
      // console.log(error);
    }
    // setLoading(false);
  };
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
            <label htmlFor="name">FULL NAME</label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <br />
          </div>
          <br />

          <div className="contactus-input">
            <label htmlFor="email">E-Mail</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <br />
          <div className="contactus-input">
            <label htmlFor="number">NUMBER</label>
            <input
              type="text"
              id="number"
              name="number"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
            />
          </div>
          <br />
          <div className="contactus-input">
            <label htmlFor="message">Message</label>
            <div className="message_div">
              <textarea
                id="message"
                name="message"
                rows="10"
                value={message}
                style={{
                  width: "100%",
                  padding: ".5rem",
                }}
                onChange={(event) => setMessage(event.target.value)}
              ></textarea>
            </div>
          </div>

          <br />
          <br />
          <div className="send_button_div">
            <Button onClick={contactUs} variant="outlined">
              Submit
            </Button>
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
      <div
        style={{
          width: "100%",
          height: "40vh",
        }}
      ></div>

      <Footer />
    </>
  );
}

export default ContactUs;
