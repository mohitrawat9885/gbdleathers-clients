import React, { useState, useEffect, useContext } from 'react';
import './Product.css';
// import ImageGallery from 'react-image-gallery';
// import 'react-image-gallery/styles/css/image-gallery.css';
import { useParams, Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
// import Button from '@mui/material/Button';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import Box from "@mui/material/Box";
import Rating from '@mui/material/Rating';
import Ripple from 'react-ripples';
// import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ImageGallery from 'react-image-gallery';
// import SideExample from './ProductImages/ReactImageMagnify';
// import Zoom from 'react-medium-image-zoom';

import 'react-image-gallery/styles/css/image-gallery.css';

import { useAlert } from "react-alert";

// import MyImageGallery from './ProductImages/ImageGallary';

// import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import 'react-medium-image-zoom/dist/styles.css';

import GlobalState from '../../GlobalState';

import Reviews from './Reviews/Reviews';

export default function Product() {
  const alert = useAlert();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const { addItemToList } = useContext(GlobalContext);
  const [cartMenu, setCartMenu] = useContext(GlobalState);

  const [parentProduct, setParentProduct] = useState({});
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([{ image: '' }]);
  const [loading, setLoading] = useState(true);
  const [variantsList, setVariantList] = useState([]);
  const [variantsSelected, setVariantsSelected] = useState();

  const [productList, setProductList] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [productListLoading, setProductListLoading] = useState(true);

  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const [propertiesList, setPropertiesList] = useState([]);

  let { productId } = useParams();
  function refreshPage() {
    setLoading(true);
    window.scroll(0, 0);
  }

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
        setParentProduct(res.data);
        setCategoryId(res.data.category._id);
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
        // console.log('Variant List', fiV);
        // console.log('Properties', res.data.multi_properties);
        if (res.data.multi_properties) {
          let proList = [];
          for (let i in res.data.multi_properties) {
            let obj = {
              name: i,
              values: res.data.multi_properties[i],
            };
            proList.push(obj);
          }
          setPropertiesList(proList);
        }
        setLoading(false);
        // getVariants();
        // console.log(fiV);
      }
    } catch (error) {
      console.log(error);
      setProduct({});
      setLoading(false);
    }
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
      }

      // document.querySelector('select').COLOR.value = 'Blue';
      // console.log('Variant Query', query);
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
        let prd = res.data.data;
        let newPrd = { ...parentProduct };
        newPrd._id = prd._id;
        if (prd.name) {
          newPrd.name = prd.name;
        }
        if (prd.price) {
          newPrd.price = prd.price;
        }
        if (prd.stock) {
          newPrd.stock = prd.stock;
        }
        if (prd.summary) {
          newPrd.summary = prd.summary;
        }
        if (prd.description) {
          newPrd.description = prd.description;
        }
        if (prd.ratingsAverage) {
          newPrd.ratingsAverage = prd.ratingsAverage;
        }
        if (prd.ratingsQuantity) {
          newPrd.ratingsQuantity = prd.ratingsQuantity;
        }
        if (prd.multi_properties) {
          newPrd.multi_properties = prd.multi_properties;
        }
        if (prd.images && prd.images.length > 0) {
          newPrd.images = prd.images;
          setImages(res.data.data.images);
        } else {
          setImages(parentProduct.images);
        }
        setProduct(newPrd);
        for (let x in prd.properties) {
          document.getElementById(`${x}`).value = prd.properties[x];
          // console.log('Key = ', x, ' Value = ', prd.properties[x]);
        }
        // console.log('Tis', prd.properties);
      } else {
        alert.error(res.message);
      }
    } catch (error) {
      console.log('ERRPR VARIANT', error);
    }
    //
  };

  const addToCart = async () => {
    try {
      setAddToCartLoading(true);
      const response = await fetch(`/api/v1/gbdleathers/client/customer/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: product._id,
        }),
      });
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        setCartMenu(true);
        setAddToCartLoading(false);
      } else {
        alert.error(res.message);
        setAddToCartLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setAddToCartLoading(false);
    }
  };
  const getCategory = async () => {
    try {
      const response = await fetch(
        `${global.api}/client/category/${categoryId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        setProductList(res.data.products);
        setProductListLoading(false);
        // console.log(res.data);
      }
    } catch (error) {}
    // setLoading(false);
  };
  useEffect(() => {
    getVariants();
  }, [variantsList]);

  function ShowVariants() {
    return (
      <>
        <div className="product-variants-div">
          {variantsList.map((variant, index) => (
            <div key={index}>
              <label htmlFor={variant.name}>{variant.name}</label>
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
  function ShowProperties() {
    return (
      <>
        <div className="product-variants-div">
          {propertiesList.map((properti, index) => (
            <div key={index}>
              <label for={properti.name}>{properti.name}</label>
              <br />
              <select
                name={properti.name}
                id={properti.name}
                // onChange={() => getVariants()}
              >
                {properti.values.map((value, i) => (
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

  function AddToCartButton() {
    if (addToCartLoading) {
      return ( 
        <div className="product-detail-add-to-cart-loading">
          <ReactLoading color="white" type="spin" height={30} width={30} />
        </div>
      );
    } else {
      return (
        <div className="product-detail-add-to-cart">
          <Ripple color="white" onClick={addToCart}>
            ADD TO CART
          </Ripple>
        </div>
      );
    }
  }

  function GetProductsWithSamecategory() {
    if (productListLoading && categoryId) {
      getCategory(categoryId);
      return <>Loading...</>;
    }
    return (
      <div className="category-page-parent">
        <div className="category-page-heading">
          <span>PRODUCTS WITH SAME CATEGORY</span>
        </div>
        <div className="category-page-body">
          {productList.map((product, index) => (
            <div className="category-page-holder" key={index}>
              <Link
                onClick={() => refreshPage()}
                to={`/product/${product._id}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="category-page-img">
                  <img
                    src={`${global.image_path}${product.front_image}`}
                    onMouseOver={(e) =>
                      (e.currentTarget.src = `${global.image_path}${product.back_image}`)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.src = `${global.image_path}${product.front_image}`)
                    }
                    alt=""
                  />
                </div>
                <br />
                <div className="category-page-detail">
                  <p>{product.name}</p>
                  <div className="category-page-price">
                    <p>QR {product.price}</p>
                  </div>
                  <div className="category-page-review">
                    <p>{product.ratingsQuantity} reviews</p>
                    {/* <br /> */}
                    <Rating
                      className="category-page-review-rating"
                      name="simple-controlled"
                      style={{
                        paddingLeft: '0px',
                        marginLeft: '0px',
                        // marginRight: ".8rem",
                      }}
                      precision={0.5}
                      value={parseFloat(product.ratingsAverage)}
                      readOnly
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

  // function myRenderItem(item) {
  //   return <SideExample />;
  // }

  const properties = {
    thumbnailPosition: 'bottom',
    useBrowserFullscreen: false,
    slideOnThumbnailOver: true,
    showPlayButton: false,
    // renderItem: myRenderItem.bind(this),
  };

  if (loading) {
    return <Header />;
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
                precision={0.5}
                value={parseFloat(product.ratingsAverage)}
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
          <div
            style={{
              width: '70%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <ShowVariants />
            <ShowProperties />
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

          {AddToCartButton()}

          <div className="product-detail-description">
            <h5>Description:-</h5>
            <br />
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      {GetProductsWithSamecategory()}
      <Reviews
        productId={product._id}
        numberOfReviews={product.ratingsQuantity}
        rating={product.ratingsAverage}
      />
      <div
        style={{
          width: '100%',
          height: '30vh',
        }}
      ></div>
      <Footer />
    </>
  );
}
