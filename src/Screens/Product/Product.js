import React from "react";
import "./Product.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const images = [
  {
    original: "/assets/categorys/c1.jpg",
    thumbnail: "/assets/categorys/c1.jpg",
  },
  {
    original: "/assets/categorys/c2.jpg",
    thumbnail: "/assets/categorys/c2.jpg",
  },
  {
    original: "/assets/categorys/c3.jpg",
    thumbnail: "/assets/categorys/c3.jpg",
  },
  {
    original: "/assets/categorys/c4.jpg",
    thumbnail: "/assets/categorys/c4.jpg",
  },
  {
    original: "/assets/categorys/c5.jpg",
    thumbnail: "/assets/categorys/c5.jpg",
  },
  {
    original: "/assets/categorys/c3.jpg",
    thumbnail: "/assets/categorys/c3.jpg",
  },
];

export default function Product() {
  const [value, setValue] = React.useState(4.5);
  const properties = {
    //thumbnailPosition: "left",
    useBrowserFullscreen: true,
    showPlayButton: true,
    slideOnThumbnailOver: true,
    // showNav: false,
    showPlayButton: false,
  };
  let { productId } = useParams();
  return (
    <>
      <div className="product-body">
        <div className="product-gallery">
          <ImageGallery items={images} {...properties} />
        </div>

        <div className="product-details-section">
          <div className="product-detail-heading">
            <p>BELT - NATURAL</p>
          </div>
          <div className="product-detail-price">
            <p>QR 99.00 </p>
            <div className="product-detail-rating">
              <Rating
                className="product-detail-rating-rate"
                name="simple-controlled"
                style={{
                  // border: "1px solid",
                  paddingLeft: "0px",
                  marginLeft: "0px",
                  marginRight: ".8rem",
                  // justifyContent: "space-between",
                }}
                value={value}
                // size="small"
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <p
                style={{
                  color: "green",
                }}
              >
                712 reviews
              </p>
            </div>
          </div>

          <div className="product-detail-indicators">
            <FiberManualRecordIcon style={{ color: "green" }} />
            <p>In Stock</p>
            {/* <br /> */}
            {/* <p>90 Day Returns</p>
            <p></p> */}
          </div>

          <div className="product-detail-description">
            <h5>Description:-</h5>
            <br />
            <p>
              Leather crafting or simply leathercraft is the practice of making
              leather into craft objects or works of art, using shaping
              techniques, coloring techniques or both.
            </p>
          </div>

          <div className="product-detail-add-to-cart">
            <span>ADD TO CART</span>
          </div>
        </div>
      </div>
    </>
  );
}
