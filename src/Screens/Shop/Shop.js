import React from "react";
import "./Shop.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

const data = [
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr1.jpg",
    price: 99.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr2.jpg",
    price: 100.19,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr3.jpg",
    price: 50.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr4.jpg",
    price: 120.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr5.jpg",
    price: 200.11,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr6.jpg",
    price: 100.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr7.jpg",
    price: 400.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr8.jpg",
    price: 200.55,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr9.jpg",
    price: 250.55,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr10.jpg",
    price: 290.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr11.jpg",
    price: 99.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr12.jpg",
    price: 100.19,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr13.jpg",
    price: 50.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr14.jpg",
    price: 120.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr15.jpg",
    price: 200.11,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr16.jpg",
    price: 100.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr17.jpg",
    price: 400.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr18.jpg",
    price: 200.55,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr19.jpg",
    price: 250.55,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr20.jpg",
    price: 290.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr21.jpg",
    price: 99.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr22.jpg",
    price: 100.19,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr23.jpg",
    price: 50.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr24.jpg",
    price: 120.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr25.jpg",
    price: 200.11,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr26.jpg",
    price: 100.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr27.jpg",
    price: 400.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr28.jpg",
    price: 200.55,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr29.jpg",
    price: 250.55,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr30.jpg",
    price: 290.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr31.jpg",
    price: 99.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr32.jpg",
    price: 100.19,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr33.jpg",
    price: 50.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr34.jpg",
    price: 120.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr35.jpg",
    price: 200.11,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr36.jpg",
    price: 100.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr37.jpg",
    price: 400.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr38.jpg",
    price: 200.55,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr39.jpg",
    price: 250.55,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr40.jpg",
    price: 290.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr41.jpg",
    price: 99.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr42.jpg",
    price: 100.19,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr43.jpg",
    price: 50.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr44.jpg",
    price: 120.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr45.jpg",
    price: 200.11,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr46.jpg",
    price: 100.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr47.jpg",
    price: 400.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr48.jpg",
    price: 200.55,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr11.jpg",
    price: 250.55,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr12.jpg",
    price: 290.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr1.jpg",
    price: 99.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr2.jpg",
    price: 100.19,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr3.jpg",
    price: 50.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr4.jpg",
    price: 120.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr5.jpg",
    price: 200.11,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr6.jpg",
    price: 100.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr7.jpg",
    price: 400.99,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr8.jpg",
    price: 200.55,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr9.jpg",
    price: 250.55,
    reviews: 712,
  },
  {
    name: "SKINNY BELT - HERITAGE BROWN",
    image: "cr10.jpg",
    price: 290.99,
    reviews: 712,
  },
];

export default function Shop() {
  const [value, setValue] = React.useState(4.5);
  return (
    <div className="shop-page-parent">
      <div className="shop-page-heading">
        <span>SHOP</span>
      </div>
      <div className="shop-page-body">
        {data.map((d) => (
          <div className="shop-page-holder">
            <Link to="/product/1" style={{ textDecoration: "none" }}>
              <div className="shop-page-img">
                <img src={`/assets/products/${d.image}`} alt="" />
              </div>
              <br />
              <div className="shop-page-detail">
                <p>{d.name}</p>
                <div className="shop-page-price">
                  <p>QR {d.price}</p>
                </div>

                <div className="shop-page-review">
                  <p>{d.reviews} reviews</p>
                  {/* <br /> */}

                  <Rating
                    className="shop-page-review-rating"
                    name="simple-controlled"
                    style={{
                      paddingLeft: "0px",
                      marginLeft: "0px",
                      // fontSize: ".9rem",
                    }}
                    value={value}
                    // size="small"
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
