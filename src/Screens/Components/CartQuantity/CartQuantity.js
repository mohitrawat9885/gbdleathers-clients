import React, { useState } from "react";

import "./CartQuantity.css";
import Button from "@mui/material/Button";
export default function CartQuantity() {
  const [quantity, setQuantity] = useState(1);
  // END Add to Cart function //

  return (
    <div className="cart-menu-quantity">
      <div className="cart-menu-quantity-btn">-</div>
      <p>6</p>
      <div className="cart-menu-quantity-btn">+</div>
    </div>
    // <div className="craft_change_div">
    //   <Button
    //     variant="outlined"
    //     // style={{ backgroundColor: "brown" }}
    //     className="craft_change_btn"
    //     onClick={() => {
    //       setQuantity(-1);
    //     }}
    //   >
    //     -
    //   </Button>
    //   <input className="show_qty_input" type="text" value={quantity} readOnly />
    //   <Button
    //     variant="outlined"
    //     // style={{ backgroundColor: "brown" }}
    //     className="craft_change_btn"
    //     onClick={() => {
    //       setQuantity(1);
    //     }}
    //   >
    //     +
    //   </Button>
    // </div>
  );
}
