import React, { useState } from "react";
import "./CartMenu.css";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CartQuantity from "../../../Components/CartQuantity/CartQuantity";
import CartProduct from "./CartProduct/CartProduct";
//import { Turn as Hamburger } from "hamburger-react";

export default function CartMenu() {
  const [sidebar, setSidebar] = useState(false);
  const HandleMenu = (toggled) => {
    if (toggled) {
      document.body.classList.add("cart-menu-fixed-position");
    } else {
      document.body.classList.remove("cart-menu-fixed-position");
    }
    setSidebar(toggled);
  };
  return (
    <>
      <div>
        <div>
          <Badge
            onClick={() => HandleMenu(true)}
            style={{ fontSize: 35 }}
            badgeContent={9}
            color="primary"
          >
            <ShoppingCartOutlinedIcon style={{ fontSize: 28 }} />
          </Badge>
        </div>
        <div
          className={
            sidebar ? "cart-menu-navDiv cart-menu-active" : "cart-menu-navDiv"
          }
          onClick={() => HandleMenu(false)}
        ></div>
        <nav
          className={
            sidebar
              ? "cart-menu-nav-menu cart-menu-active"
              : "cart-menu-nav-menu"
          }
        >
          <ul className="cart-menu-nav-menu-items">
            <li className="cart-menu-navbar-toggle">
              <div className="cart-menu-menu-bars">
                <p>CART</p>
                <ClearIcon
                  onClick={() => HandleMenu(false)}
                  style={{ fontSize: 35 }}
                />
              </div>
            </li>

            <li className="cart-menu-product-list-product">
              <Link to="/">
                <CartProduct />
              </Link>
            </li>

            <li className="cart-menu-product-list-product">
              <Link to="/">
                <CartProduct />
              </Link>
            </li>

            <li className="cart-menu-product-list-product">
              <Link to="/">
                <CartProduct />
              </Link>
            </li>
            <li className="cart-menu-product-list-check-out">
              <div className="cart-menu-product-list-check-out-total">
                <p>SUBTOTAL</p>
                <span>QTR 200.00</span>
              </div>
              <div className="cart-menu-product-list-check-out-btn">
                <p>CHECK OUT</p>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
