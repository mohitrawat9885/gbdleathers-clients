import React, { useState, useEffect } from 'react';
import './Product.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useParams } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import Box from "@mui/material/Box";
import Rating from '@mui/material/Rating';
// import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function Product() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [value, setValue] = React.useState(4.5);
  const [product, setProduct] = useState({
    name: '',
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const properties = {
    //thumbnailPosition: "left",
    useBrowserFullscreen: true,
    showPlayButton: true,
    slideOnThumbnailOver: true,
    // showNav: false,
    showPlayButton: false,
  };
  let { productId } = useParams();

  const getProduct = async () => {
    try {
      const response = await fetch(
        `${global.api}/client/product/${productId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        // res.product.images.forEach((img) => {
        //   let im = {
        //     original: img,
        //     thumbnail: img,
        //   };
        //   images.push(im);
        // });
        setProduct(res.data);
        setImages(res.data.images);
      }
    } catch (error) {
      setProduct();
    }
    setLoading(false);
  };
  if (loading) {
    getProduct();
    setLoading(false);
  }

  return (
    <>
      <Header />
      <div className="product-body">
        <div className="product-gallery">
          <ImageGallery
            items={images.map((img, index) => ({
              original: `${global.image_path}/${img}`,
              thumbnail: `${global.image_path}/${img}`,
            }))}
            {...properties}
          />
        </div>

        <div className="product-details-section">
          <div className="product-detail-heading">
            <p>{product.name}</p>
          </div>
          <div className="product-detail-price">
            <p>QR {product.price} </p>
            <div className="product-detail-rating">
              <Rating
                className="product-detail-rating-rate"
                name="simple-controlled"
                style={{
                  // border: "1px solid",
                  paddingLeft: '0px',
                  marginLeft: '0px',
                  marginRight: '.8rem',
                  // justifyContent: "space-between",
                }}
                value={parseInt(product.ratingsAverage)}
                // size="small"
                // onChange={(event, newValue) => {
                //   setValue(newValue);
                // }}
              />
              <p
                style={{
                  color: 'green',
                }}
              >
                {product.ratingsQuantity} reviews
              </p>
            </div>
          </div>

          <div className="product-detail-indicators">
            <FiberManualRecordIcon style={{ color: 'green' }} />
            <p>{product.stock} Stock</p>
            {/* <br /> */}
            {/* <p>90 Day Returns</p>
            <p></p> */}
          </div>

          <div className="product-detail-description">
            <h5>Summary:-</h5>
            <br />
            <p>{product.summary}</p>
          </div>

          <div className="product-detail-add-to-cart">
            <span>ADD TO CART</span>
          </div>

          <div className="product-detail-description">
            <h5>Description:-</h5>
            <br />
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
