import React from "react";
import "./RippleIndicator.css";
export default function RippleIndicator(props) {
  if (props.stock >= 2) {
    return (
      <div className="stock-indicator">
        <span></span>
      </div>
    );
  }
  return (
    <div className="stock-indicator stock-indicator-dn">
      <span></span>
    </div>
  );
}
