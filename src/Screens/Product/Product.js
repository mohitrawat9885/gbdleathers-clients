import React, { useState, useEffect } from 'react';
import './Product.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';

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
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [variantsList, setVariantList] = useState([]);
  const [variantsSelected, setVariantsSelected] = useState();

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
        setProduct(res.data);
        setImages(res.data.images);
        const myVariants = res.data.variants;
        // console.log(myVariants);
        let v = [];

        for (let i = 0; i < myVariants.length; i++) {
          for (let j in myVariants[i].properties) {
            if (!v[j]) {
              v[j] = [];
            }

            if (v[j].indexOf(myVariants[i].properties[j]) === -1)
              v[j].push(myVariants[i].properties[j]);
          }
        }
        let fiV = [];
        let tepFiV = { name: '', values: [] };
        for (let i in v) {
          tepFiV = {
            name: i,
            values: v[i],
          };
          fiV.push(tepFiV);
        }
        setVariantList(fiV);
        console.log(fiV);
      }
    } catch (error) {
      console.log(error);
      setProduct({});
    }
    setLoading(false);
  };
  if (loading) {
    getProduct();
    setLoading(false);
  }

  const getVariants = async () => {
    try {
      let query = '';
      let values = document.querySelectorAll('select');
      for (let i = 0; i < values.length; i++) {
        query = query + values[i].name + '=' + values[i].value;
        if (i < values.length - 1) {
          query = query + '&';
        }
        // console.log(values[i].name, values[i].value);
      }
      console.log(query);

      const response = await fetch(
        `${global.api}/client/product/${productId}/variant?${query}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        let vari = res.data.data;
        console.log(res.data);
        // alert(res.status);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    try {
      const response = await fetch(`/api/v1/gbdleathers/client/customer/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: productId,
        }),
      });
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
      } else {
        // alert(res.status.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function ShowVariants() {
    return (
      <>
        <div className="product-variants-div">
          {variantsList.map((variant, index) => (
            <div key={index}>
              <label for={variant.name}>{variant.name}</label>
              <br />
              <select
                name={variant.name}
                id={variant.name}
                onChange={() => getVariants()}
              >
                {variant.values.map((value, i) => (
                  <option key={i} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </>
    );
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
                readOnly
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
          <div>
            <ShowVariants />
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
            <Button
              style={{
                width: '100%',
                backgroundColor: 'brown',
                borderRadius: 0,
              }}
              variant="contained"
              onClick={addToCart}
            >
              ADD TO CART
            </Button>
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
