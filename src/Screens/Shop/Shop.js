import React, { useEffect, useState } from 'react';
import './Shop.css';
import { Link } from 'react-router-dom';

import Rating from '@mui/material/Rating';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Pagination from '@mui/material/Pagination';

import { Loading } from '../../GlobalState';

// import { useAlert } from "react-alert";

export default function Shop() {
  // const alert = useAlert();
  const [, setPageLoading] = React.useContext(Loading)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // const [value, setValue] = React.useState(4.5);
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [numberOfDocument, setNumberOfDocument] = useState()

  const getAllProduct = async (queryString) => {
    try {
      setPageLoading(true)
      // setLoading(true)
      const response = await fetch(
        `${global.api}/client/product/${queryString}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        // alert.show(res.status)
        setProductList(res.data);
        setNumberOfDocument(res.totalDocument)
        setPageLoading(false)
        // console.log(res.data)
      }
    } catch (error) {
      setProductList([]);
      setPageLoading(false)
    }
    setLoading(false);
  };
  if (loading) {
    getAllProduct('?limit=50&page=1');
    setLoading(false);
  }

  const handlePagination = (event, value)=> {
    // alert.show(value);
    getAllProduct(`?limit=50&page=${value}`);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <Header />
      <div className="shop-page-parent">
        <div className="shop-page-heading">
          <span>SHOP</span>
        </div>
        <div className="shop-page-body">
          {productList.map((product) => (
            <div className="shop-page-holder">
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="shop-page-img">
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
                {/* <br /> */}
                <div className="shop-page-detail">
                  <p>{product.name.toUpperCase()}</p>
                  <div className="shop-page-price">
                    <p>QR {product.price}</p>
                  </div>

                  <div className="shop-page-review">
                    
                    {/* <br /> */}

                    <Rating
                      className="shop-page-review-rating"
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
        <div className='shop-pagination' style={{
        marginTop: "2rem"
        }}>
                <Pagination size='medium' count={numberOfDocument / 50}
                onChange={handlePagination}
                />

        </div>
      </div>
      <div style={{
        width:"100%",
        height: '40vh'
      }}></div>
      <Footer />
    </>
  );
}
