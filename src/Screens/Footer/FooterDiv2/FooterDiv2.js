import React from "react";
import { Link } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

import "./FooterDiv2.css";
export default function Footer() {
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  return (
    <>
      <div className="footer-div-2">
        <div className="footer-social-icons-div">
          <ul>
            <li id="footer-social-icon-1">
              <Link to="/">
                <FacebookIcon style={{ fontSize: 30 }} />
              </Link>
            </li>

            <li id="footer-social-icon-2">
              <Link to="/">
                <LinkedInIcon style={{ fontSize: 30 }} />
              </Link>
            </li>
            <li id="footer-social-icon-3">
              <Link to="/">
                <TwitterIcon style={{ fontSize: 30 }} />
              </Link>
            </li>

            <li id="footer-social-icon-4">
              <Link to="/">
                <InstagramIcon style={{ fontSize: 30 }} />
              </Link>
            </li>
          </ul>
          <div className="footer-gotoup-btn" onClick={() => topFunction()}>
            <KeyboardArrowUpRoundedIcon
              style={{
                fontSize: 45,
                // color: "white",
              }}
            />
          </div>
        </div>
        <div className="footer-copy-right">
          <span>© 2022 GBD Leathers, All rights reserved.</span>
        </div>
      </div>
    </>
  );
}
