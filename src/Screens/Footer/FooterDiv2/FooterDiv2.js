import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import YouTubeIcon from "@mui/icons-material/YouTube";
import RedditIcon from "@mui/icons-material/Reddit";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import "./FooterDiv2.css";
export default function Footer() {
  return (
    <>
      <div className="footer-div-2">
        <div className="footer-copy-right">
          <span>© 2022 GBD Leathers, All rights reserved.</span>
        </div>
        <div className="footer-social-icons-div">
          <ul>
            <li>
              <Link to="/">
                <InstagramIcon style={{ fontSize: 30 }} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <FacebookIcon style={{ fontSize: 30 }} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <TwitterIcon style={{ fontSize: 30 }} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <LinkedInIcon style={{ fontSize: 30 }} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <PinterestIcon style={{ fontSize: 30 }} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <YouTubeIcon style={{ fontSize: 30 }} />
              </Link>
            </li>
            {/* <li>
              <Link to="/">
                <RedditIcon style={{ fontSize: 30 }} />
              </Link>
            </li> */}
            {/* <li>
              <Link to="/">
                <SocialDistanceIcon style={{ fontSize: 30 }} />
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}
