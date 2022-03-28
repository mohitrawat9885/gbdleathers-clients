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
import Zoom from 'react-medium-image-zoom';

import 'react-image-gallery/styles/css/image-gallery.css';

import { useAlert } from "react-alert";

// import MyImageGallery from './ProductImages/ImageGallary';

// import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import 'react-medium-image-zoom/dist/styles.css';

import GlobalState from '../../GlobalState';

// import Reviews from './Reviews/Reviews';

import { Loading } from '../../GlobalState';

import './Reviews/Reviews.css';

import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'


export default function Product() {
  const [, setPageLoading] = React.useContext(Loading)
  const alert = useAlert();
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);


  const [rating, setRating] = useState();
  const [review, setReview] = useState();
  const [reviewList, setReviewList] = useState([]);
  const [reviewListLoading, setReviewListLoading] = useState(true);
  const [myreview, setMyReview] = useState('nodata');

  // const { addItemToList } = useContext(GlobalContext);
  const [, setCartMenu] = useContext(GlobalState);

  const [parentProduct, setParentProduct] = useState({});
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([{ image: '' }]);
  const [loading, setLoading] = useState(true);
  const [variantsList, setVariantList] = useState([]);
  // const [variantsSelected, setVariantsSelected] = useState();

  const [productList, setProductList] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [productListLoading, setProductListLoading] = useState(true);

  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const [propertiesList, setPropertiesList] = useState([]);

  let { productId } = useParams();
  // alert.show(productId)
  // const [productid, setProductid] = useState(productId)
  function refreshPage() {
    setLoading(true); 
    // window.location.reload()
    window.scroll(0, 0);
  }

  const getProduct = async () => {
    try {
      setPageLoading(true)
      setMyReview('nodata')
      setReviewListLoading(true)
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
        // setProductid(productId)
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
        setPageLoading(false)
        // getVariants();
        // console.log(fiV);
      }
    } catch (error) {
      // console.log(error)
      setProduct({});
      setLoading(false);
      setPageLoading(false)
    }
  };
  if (loading) {
    getProduct();
    setLoading(false);
  }

  const getVariants = async () => {
    try {
      // setPageLoading(true)
      // alert.show("Fetch vari")
      let query = '';
      let values = document.getElementsByClassName("product-variant-properties")
      // console.log("Values are ", values)
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
        else{
          newPrd.stock = 0;
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
      } else {
        alert.error(res.message);
        // setPageLoading(false)
      }
      // for (let x in prd.properties) {
      //   document.getElementById(`${x}`).value = prd.properties[x];
      //   // console.log('Key = ', x, ' Value = ', prd.properties[x]);
      // }
    } catch (error) {
      // setPageLoading(false)
      console.log('ERRPR VARIANT', error);
    }
    //
  };

  const addToCart = async () => {
    
    try {
      // setCartMenu((v) => !v)
      let multi_properties = [];
      let single_properties = [];
      let values = document.getElementsByClassName("product-variant-multi_properties")
      // console.log("Values are ", values)
      for (let i = 0; i < values.length; i++) {
        // query = query + values[i].name + '=' + values[i].value;
        let proObj = {
          name: values[i].name,
          value: values[i].value
        }
        multi_properties.push(proObj)
      }

      let values2 = document.getElementsByClassName("product-variant-properties")
      // console.log("Values are ", values)
      for (let i = 0; i < values2.length; i++) {
        let proObj2 = {
          name: values2[i].name,
          value: values2[i].value
        }
        single_properties.push(proObj2)
      }


      console.log(single_properties)
      setAddToCartLoading(true);
      const response = await fetch(`/api/v1/gbdleathers/client/customer/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: product._id,
          multi_properties
        }),
      });
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        setCartMenu(true)
        setAddToCartLoading(false)

      } else {
        alert.error(res.message);
        setAddToCartLoading(false);
      }
      // console.log(multi_properties[0])
      for (let x in multi_properties) {
        // console.log('Key = ', x, ' Value = ', multi_properties[x]);
        document.getElementById(`${multi_properties[x].name}`).value = multi_properties[x].value;
      }
      for (let x in  single_properties) {
        document.getElementById(`${single_properties[x].name}`).value = single_properties[x].value;
      }
    } catch (error) {
      console.log(error);
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



  const getFilesFromEvent = e => {
    // console.log("Uppdse Change", e)
      return new Promise(resolve => {
          getDroppedOrSelectedFiles(e).then(chosenFiles => {
              resolve(chosenFiles.map(f => f.fileObject))
          })
      })
  }
  const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
      const textMsg = 'ADD PHOTOS'
      return (
        <>
          <label className="review-add-photo-btn">
              {textMsg}
              <input
                  style={{ display: 'none' }}
                  type="file"
                  accept={accept}
                  multiple
                  onChange={e => {
                      getFilesFromEvent(e).then(chosenFiles => {
                          onFiles(chosenFiles)
                      })
                  }}
              />
          </label>
          {/* <div className='ab' id="dzu-submitButtonContainer2">
            <button class="dzu-submitButton">SUBMIT 2</button>
          </div> */}
          </>
      )
  }


  const createReview = async (files) => {
    try {
      if (!rating) {  
        alert.show('Please give some rating!');
        return;
      }
      if (!review) {
        alert.show('Please give review!');
        return;
      }
      const data = new FormData();
      // alert.show(`Ratings ${rating}`)
      data.append("rating", rating)
      data.append("review", review)

      for(let i in files){
        data.append("images", files[i].file)
      }
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/reviews/${productId}`,
        {
          method: 'POST',
          // headers: {
          //   'Accept': 'application/json',
          //   'Content-Type': 'multipart/form-data',
          // },
          body: data,
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        // alert(res.message);
        getMyReviews();
        getAllReviews();
      } else {
        alert.error('Something went wrong please try again.');
      }
    } catch (error) {
      alert.error('Something Went wrong try again');
      // console.log(error);
    }
  };

  const getAllReviews = async () => {
    // alert.show("Rev fetch")
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/reviews/${productId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        setReviewList(res.data);
        // console.log('Reviews', res.data);
        setReviewListLoading(false);
      }
    } catch (error) {
      // console.log('Error Fetching reviews', error);
      setReviewListLoading(false);
    }
  };
  const getMyReviews = async () => {
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/reviews/${productId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        if (!res.data || res.data.length < 1) {
          setMyReview('notyet');
        } else {
          setMyReview('done');
        }
      }
      
    } catch (error) {
      console.log('Error Fetching reviews', error);
      setReviewListLoading(false);
    }
  };

  function GetReviewdateTime(date) {
    let d = new Date(date);
    return d.toUTCString();
  }

  function renderReviewsList() {
    if (reviewListLoading) {
      getAllReviews();
      return <p>Loading...</p>;
    }
    return (
      <div
        style={{
          width: '100%',
        }}
      >
        {reviewList.map((review, i) => (
          <div
            key={i}
            style={{
              width: '100%',
              padding: '.5rem',
              marginTop: '1rem',
              borderTop: '1px solid lightgray',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                marginTop: '.6rem',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  {review.customer.first_name} {review.customer.last_name}
                </p>
                <br />
                <Rating
                  style={{
                    marginLeft: '.6rem',
                  }}
                  size="small"
                  value={review.rating}
                  precision={0.5}
                  readOnly
                />
              </div>
              <p>{GetReviewdateTime(review.updated_at)}</p>
            </div>
            <br />
            <div>
              <p
                style={{
                  fontSize: 16,
                  color: 'rgb(80, 80, 80)',
                }}
              >
                {review.review}
              </p>
            </div>
            <br />
            <br />
            <div style={{
              width: '100%',
              display: "flex",
              flexDirection: "row",
              // justifyContent: 'space-between',
            }}>
             { review?.images?.map((img, index)=> (
               <div key={index} style={{
                 width: '100px',
                 height: '100px',
                 marginRight: '1rem'
               }}>
                 <Zoom>
              <img src={`${global.image_path}${img}`} alt="" />
              </Zoom>
              </div>
             ))
  }           
            </div>
          </div>
        ))}
      </div>
    );
  }

  function RenderGiveReview() {
    if (myreview === 'nodata') {
      getMyReviews();
    }
    if (myreview === 'nodata' || myreview === 'given') {
      return <></>;
    } else if (myreview === 'notyet') {
      return (
        <div className="review-create-review-div">
          <p
            style={{
              fontSize: '1.6rem',
              color: 'rgb(80, 80, 80)',
            }}
          >
            Give Your Review
          </p>
          <br />
          <div className="preview-create-review">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
                // justifyContent: 'center'
              }}
            >
              <p>Rating</p>
              <Rating
                style={{
                  marginLeft: '1rem',
                  
                }}
                size="medium"
                value={parseFloat(rating)}
                onChange={(event, newValue) => setRating(newValue)}
                precision={0.5}
                // readOnly
              />
            </div>
            <br />
            <div>
              <p
                style={{
                  marginBottom: '.8rem',
                }}
              >
                Review
              </p>
              <textarea
                name="message"
                rows="4"
                style={{
                  width: '100%',
                  fontSize: '1.3rem',
                  padding: '.4rem',
                  fontStyle: 'revert',
                  border: '1px solid lightgray',
                }}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
            </div>
            <br />
           
            <Dropzone
            onSubmit={createReview}
            InputComponent={selectFileInput}
            // getUploadParams={fileParams}
            // onChangeStatus={OnChangePreviewImages}
            getFilesFromEvent={getFilesFromEvent}
            accept="image/*"
            maxFiles={5}
            // SubmitButtonComponent={ReviewSubmitButton}
            submitButtonContent="SUBMIT"
            // inputContent="Drop A File"
            // submitButtonDisabled
        />
            {/* </div> */}
            <div
              id="result"
              // className='review-upload-images-div'
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                height: '6rem',
              }}
            >
              <output id="result" />
            </div>
          </div>
          <br />
          <br />
        </div>
      );
    }
  }

  function Reviews(numberOfReviews,  rating){
    return (
      <div className="review-div">
        <div className="review-holder">
          <div className="review-header">
            <div className="review-header-rating">
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'row',
                  alignItems: 'center',
                }}
              >
                <p
                  style={{
                    fontSize: '2.2rem',
                  }}
                >
                  {rating}
                </p>
                <Rating
                  style={{ marginLeft: '1rem' }}
                  value={parseFloat(rating)}
                  size="large"
                  precision={0.5}
                  readOnly
                />
              </div>
              <br />
              <p>{numberOfReviews} Reviews</p>
            </div>
            {RenderGiveReview()}
            {renderReviewsList()}
          </div>
        </div>
        <div
          style={{
            width: '100%',
            height: '16vh',
            borderBottom: '1px solid lightgray',
          }}
        ></div>
      </div>
    );
  
  }
  

  useEffect(() => {
    getVariants();
    // eslint-disable-next-line
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
              className='product-variant-properties'
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
              className='product-variant-multi_properties'
                name={properti.name}
                id={properti.name}
                // onChange={(e) => {
                //   // console.log(this.name)
                // }}
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
      <div className="category-page-parent" style={{
        marginTop: "16rem",
        // marginBottom: '15rem'
      }}>
        <div className="category-page-heading" style={{
          marginBottom: '6rem'
        }}>
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
                
                <div className="category-page-detail">
                  <p>{product.name.toUpperCase()}</p>
                  <div className="category-page-price">
                    <p>QR {product.price}</p>
                  </div>

                  <div className="category-page-review">
                    <Rating
                      className="category-page-review-rating"
                      name="read-only"
                      size="small"
                      precision={0.5}
                      value={parseFloat(product.ratingsAverage)}
                      readOnly
                    />
                    <p>{product.ratingsQuantity} reviews</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div style={{
          width: "100%",
          height: "20vh"
        }}></div>
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
            <p>{product.name?.toUpperCase()}</p>
          </div>
          <div className="product-detail-price">
            <p>QR {product.price} </p>
            <div className="product-detail-rating">
              <Rating
                className="product-detail-rating-rate"
                name="simple-controlled"
                precision={0.5}
                value={parseFloat(product.ratingsAverage)}
                size="small"
                style={{
                  paddingLeft: '0.7rem'
                }}
                readOnly
              />
              <p>
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
          </div>
          {AddToCartButton()}

          <div className="product-detail-description">
            <h5>Summary:-</h5>
            <br />
            <p>{product.summary}</p>
          </div>
          <div className="product-detail-description">
            <h5>Description:-</h5>
            <br />
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      {GetProductsWithSamecategory()}
      {Reviews(product.ratingsQuantity,product.ratingsAverage)}
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
