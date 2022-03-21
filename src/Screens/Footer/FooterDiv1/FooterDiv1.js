import React from 'react';
import './FooterDiv1.css';

import CallRoundedIcon from '@mui/icons-material/CallRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

// import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
// import SendRoundedIcon from '@mui/icons-material/SendRounded';
// import { Link } from 'react-router-dom';
export default function FooterDiv1() {
  // const [footerMenu1, setFooterMenu1] = useState('down');
  // const footerDivDropdownMenu1 = () => {
  //   if (footerMenu1 === 'up') {
  //     document
  //       .getElementById('footer-div-1-2-nav-1-open')
  //       .classList.remove('footer-div-1-2-nav-1-open-active');
  //     setFooterMenu1('down');
  //   } else {
  //     document
  //       .getElementById('footer-div-1-2-nav-1-open')
  //       .classList.add('footer-div-1-2-nav-1-open-active');
  //     setFooterMenu1('up');
  //   }
  // };
  return (
    <>
      <div className="footer-div-1">
        <div className="footer-div-1-1">
          <ul>
            <li>
              <CallRoundedIcon className="footer-div-1-1-icon" />
              <p>+91-XXXX-XXXX-XX</p>
            </li>
            <li>
              <EmailRoundedIcon className="footer-div-1-1-icon" />
              <p>gbdleathers@gmail.com</p>
            </li>
            <li>
              <LocationOnRoundedIcon className="footer-div-1-1-icon" />
              <p>Mathar Khadeem</p>
              <p>Doha, 5325 Qatar</p>
            </li>
          </ul>
        </div>

        {/* <div className="footer-div-1-2">
          <ul>
            <li
              className="footer-div-1-2-heading"
              onClick={() => footerDivDropdownMenu1()}
            >
              SHOP
              <KeyboardArrowDownRoundedIcon className="footer-div-1-2-shop-down" />
            </li>
            <nav
              id="footer-div-1-2-nav-1-open"
              className="footer-div-1-2-nav-1"
            >
              <li>
                <Link to="#">Wallets</Link>
              </li>
              <li>
                <Link to="#">Belts</Link>
              </li>
              <li>
                <Link to="#">Tech</Link>
              </li>
              <li>
                <Link to="#">Diy Kits</Link>
              </li>
              <li>
                <Link to="#">Watch Straps</Link>
              </li>
              <li>
                <Link to="#">Notebook Cover</Link>
              </li>
              <li>
                <Link to="#">Everythings Else</Link>
              </li>
              <li>
                <Link to="#">Gift Card</Link>
              </li>
            </nav>
          </ul>

          <ul>
            <li className="footer-div-1-2-heading">RESOURCES</li>
            <li>
              <Link to="#">Blogs</Link>
            </li>
            <li>
              <Link to="#">News & Feeds</Link>
            </li>
            <li>
              <Link to="#">Privacy Policy</Link>
            </li>
          </ul>

          <ul className="footer-subscribe-div">
            <li className="footer-div-1-2-heading">SUBSCRIBE</li>
            <li className="footer-subscribe">
              <p>Email</p>
              <div className="footer-subscribe-box">
                <input type="text" />
                <SendRoundedIcon
                  style={{
                    fontSize: '30px',
                  }}
                />
              </div>
            </li>
          </ul>
        </div> */}
      </div>
    </>
  );
}
