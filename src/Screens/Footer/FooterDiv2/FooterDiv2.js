import React from 'react';
// import { Link } from 'react-router-dom';

import FacebookIcon from '@mui/icons-material/Facebook';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

import './FooterDiv2.css';
export default function Footer() {
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  function getDate() {
    let d = new Date();
    return d.getFullYear();
  }

  return (
    <>
      <div className="footer-div-2">
        <div className="footer-social-icons-div">
          <ul>
            <li id="footer-social-icon-1">
              <a href="https://www.facebook.com/gbd.qa" target="__blank">
                <FacebookIcon style={{ fontSize: 30 }} />
              </a>
            </li>

            {/* <li id="footer-social-icon-2">
              <a>
                <LinkedInIcon style={{ fontSize: 30 }} />
              </a>
            </li>
            <li id="footer-social-icon-3">
              <a>
                <TwitterIcon style={{ fontSize: 30 }} />
              </a>
            </li> */}

            <li id="footer-social-icon-4">
              <a href="https://www.instagram.com/gbd.qa/" target="__blank">
                <InstagramIcon style={{ fontSize: 30 }} />
              </a>
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
          <span>&copy; {getDate()} GBD Leathers, All rights reserved.</span>
        </div>
      </div>
    </>
  );
}
