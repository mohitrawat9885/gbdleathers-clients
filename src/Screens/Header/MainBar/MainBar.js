import Menu from "./Menus/Menu";
import "./MainBar.css";
import { Link } from "react-router-dom";
import CartMenu from "./CartMenu/CartMenu";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

import logo from "./logo.jpeg";
const MainBar = () => {
  return (
    <>
      <div className="mainBar">
        <div className="mainBarDiv1">
          <Menu />
        </div>
        <div className="mainBarDiv2">
          <Link to="/">
            <div className="logo">
              <img src={logo} alt="GBDLeathers" />
              <p>GBD Leathers</p>
            </div>
          </Link>
        </div>
        <div className="mainBarDiv3">
          <div className="rightMenus">
            <div className="rightMenuHolder">
              <div className="login">
                <Link to="login">
                  <PermIdentityOutlinedIcon style={{ fontSize: 28 }} />
                </Link>
              </div>
              <div className="cart">
                <CartMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBar;
