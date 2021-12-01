import React from "react";
import "./Categorys.css";

import { Link } from "react-router-dom";

const data1 = [
  {
    _id: 1,
    name: "SHOP BELTS",
    image: "c1.jpg",
  },
  {
    _id: 2,
    name: "SHOP WATCHES",
    image: "c2.jpg",
  },
  {
    _id: 3,
    name: "COLOR THREADS",
    image: "c3.jpg",
  },
  {
    _id: 4,
    name: "THE CLOTH COLLECTION",
    image: "c4.jpg",
  },
  {
    _id: 5,
    name: "LEATHER CARE",
    image: "c5.jpg",
  },
  {
    _id: 6,
    name: "Wallets",
    image: "c6.jpg",
  },
];

const data2 = [
  {
    _id: 7,
    name: "SHOP WALLETS",
    image: "cr1.jpg",
  },
  {
    _id: 8,
    name: "SHOP BELTS",
    image: "cr2.jpg",
  },
  {
    _id: 9,
    name: "POCKET PROFILE",
    image: "cr3.jpg",
  },
  {
    _id: 10,
    name: "THE TECH COLLECTION",
    image: "cr4.jpg",
  },
  {
    _id: 11,
    name: "LEATHER CARE",
    image: "cr5.jpg",
  },
  {
    _id: 12,
    name: "Wallets",
    image: "cr6.jpg",
  },
  {
    _id: 13,
    name: "POCKET PROFILE",
    image: "cr7.jpg",
  },
  {
    _id: 14,
    name: "THE TECH COLLECTION",
    image: "cr8.jpg",
  },
  {
    _id: 15,
    name: "LEATHER CARE",
    image: "cr9.jpg",
  },
  {
    _id: 16,
    name: "Wallets",
    image: "cr10.jpg",
  },
];

const Categorys = () => {
  return (
    <>
      <div className="categoryBody">
        {/* <div className="categoryDiv"> */}
        <div className="category-section-1">
          {/*  */}
          {data1.map((d) => (
            <div className="category-holder">
              <Link
                to={`category/${d.name}`}
                style={{ textDecoration: "none" }}
              >
                <div className="category-img">
                  <img src={`assets/categorys/${d.image}`} alt="" />
                </div>

                <div className="category-btn">
                  <span>{d.name}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="category-section-2">
          {data2.map((d) => (
            <div className="category-holder-2">
              <Link
                to={`category/${d.name}`}
                style={{ textDecoration: "none" }}
              >
                <div className="category-img-2">
                  <img src={`assets/categorys/${d.image}`} alt="" />
                </div>

                <div className="category-name">
                  <p>{d.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categorys;
