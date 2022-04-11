import React, { useState, useEffect, useContext } from "react";
import "./CartMenu.css";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import CartQuantity from '../../../Components/CartQuantity/CartQuantity';
import Ripple from "react-ripples";
import "./CartQuantity.css";
// import Button from '@mui/material/Button';
// import CartProduct from './CartProduct/CartProduct';
import GlobalState from "../../../../GlobalState";
import "./CartProduct.css";
//import { Turn as Hamburger } from "hamburger-react";

// import ReactLoading from 'react-loading';
import { useAlert } from "react-alert";

export default function CartMenu() {
  const alert = useAlert();
  const [cartMenu, setCartMenu] = useContext(GlobalState);

  const [loading, setLoading] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  const [cartList, setCartList] = useState([]);

  const HandleMenu = function (toggled) {
    // alert("triggered")
    if (toggled) {
      getCartProducts();
      document.body.classList.add("cart-menu-fixed-position");
    } else {
      document.body.classList.remove("cart-menu-fixed-position");
    }
    setSidebar(toggled);
  };
  useEffect(() => {
    if (cartMenu === true) {
      HandleMenu(true);
    }
    setCartMenu(false);
    // eslint-disable-next-line
  }, [cartMenu]);
  useEffect(() => {
    getCartProducts();
  }, []);

  const getCartProducts = async () => {
    try {
      const response = await fetch(`/api/v1/gbdleathers/client/customer/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        setCartList(res.data);
        // console.log(res.data);
      }
    } catch (error) {
      // console.log(error);
      // setProduct({});
    }
    setLoading(false);
  };
  const addToCart = async (productId, quantity) => {
    try {
      const response = await fetch(`/api/v1/gbdleathers/client/customer/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: productId,
          quantity,
        }),
      });
      // console.log('Responce', response.status);
      if (response.status === 204) {
        getCartProducts();
        return;
      }
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        getCartProducts();
      } else {
        alert.error(res.message);
      }
    } catch (error) {
      alert.error("Something went wrong!");
      // console.log(error);
    }
  };

  function CartProduct(props) {
    return (
      <>
        <div className="cart-menu-product-div">
          <div className="cart-menu-product-img">
            <img
              src={`${global.image_path}${props.product.front_image}`}
              alt=""
            />
          </div>
          <div className="cart-menu-product-detail">
            <div className="cart-menu-product-detail-name">
              <p>{props.product.name}</p>
            </div>
            <div className="cart-menu-product-detail-qty-price">
              <div className="cart-menu-product-detail-qty">
                <div className="cart-menu-quantity">
                  <div
                    className="cart-menu-quantity-btn"
                    style={{ cursor: "pointer" }}
                    onClick={() => addToCart(props.product._id, -1)}
                  >
                    -
                  </div>
                  <p>{props.quantity}</p>

                  <div
                    style={{ cursor: "pointer" }}
                    className="cart-menu-quantity-btn"
                    onClick={() => addToCart(props.product._id, 1)}
                  >
                    +
                  </div>
                </div>
              </div>

              <div className="cart-menu-product-detail-price">
                <p>QR {(props.product.price * props.quantity).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function calculateTotal() {
    let total = 0;
    for (let i in cartList) {
      total = total + cartList[i].product.price * cartList[i].quantity;
    }
    return total.toFixed(2);
    // alert(total);
  }
  function CartItems() {
    if (loading) {
      return <>Loading...</>;
    } else if (cartList.length > 0) {
      return (
        <>
          {cartList.map((cart, index) => (
            <li className="cart-menu-product-list-product" key={index}>
              <CartProduct product={cart.product} quantity={cart.quantity} />
            </li>
          ))}

          <li className="cart-menu-product-list-check-out">
            <div className="cart-menu-product-list-check-out-total">
              <p>SUBTOTAL</p>
              <span>QR {calculateTotal()}</span>
            </div>

            <Link to="/check-out">
              <Ripple className="cart-menu-product-list-check-out-btn">
                <div>
                  <span>CHECK OUT</span>
                </div>
              </Ripple>
            </Link>
          </li>
        </>
      );
    } else {
      return <>Empty Cart</>;
    }
  }

  return (
    <>
      <div>
        <div>
          <Badge
            onClick={() => HandleMenu(true)}
            style={{
              fontSize: 35,
              // textEmphasisColor: 'gray',
              cursor: "pointer",
            }}
            sx={{
              "& .MuiBadge-badge": {
                color: "white",
                backgroundColor: "#FC5111",
              },
            }}
            badgeContent={cartList.length}
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
                  style={{
                    fontWeight: "100",
                    marginTop: ".6rem",
                    fontSize: 26,
                    cursor: "pointer",
                  }}
                />
              </div>
            </li>
            <CartItems />
          </ul>
        </nav>
      </div>
    </>
  );
}
