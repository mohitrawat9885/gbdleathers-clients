import React from "react";
import "./Category.css";
import { useParams, Link } from "react-router-dom";
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

export default function Category() {
  const { categoryId } = useParams();
  const [value, setValue] = React.useState(4.5);
  return (
    <div className="category-page-parent">
      <div className="category-page-heading">
        <span>{categoryId}</span>
      </div>
      <div className="category-page-body">
        {data.map((d) => (
          <div className="category-page-holder">
            <Link to="/product/1" style={{ textDecoration: "none" }}>
              <div className="category-page-img">
                <img src={`/assets/products/${d.image}`} alt="" />
              </div>
              <br />
              <div className="category-page-detail">
                <p>{d.name}</p>
                <div className="category-page-price">
                  <p>QR {d.price}</p>
                </div>

                <div className="category-page-review">
                  <p>{d.reviews} reviews</p>
                  {/* <br /> */}
                  <Rating
                    className="category-page-review-rating"
                    name="simple-controlled"
                    style={{
                      paddingLeft: "0px",
                      marginLeft: "0px",
                      // marginRight: ".8rem",
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
