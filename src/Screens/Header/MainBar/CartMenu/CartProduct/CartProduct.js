import React from "react";
import CartQuantity from "../../../../Components/CartQuantity/CartQuantity";
import "./CartProduct.css";
export default function CartProduct() {
  return (
    <>
      <div className="cart-menu-product-div">
        <div className="cart-menu-product-img">
          <img src="/assets/products/cr10.jpg" alt="" />
        </div>
        <div className="cart-menu-product-detail">
          <div className="cart-menu-product-detail-name">
            <p>Belt - Natural</p>
          </div>
          <div className="cart-menu-product-detail-qty-price">
            <div className="cart-menu-product-detail-qty">
              <CartQuantity />
            </div>

            <div className="cart-menu-product-detail-price">
              <p>QTR 100.00</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
