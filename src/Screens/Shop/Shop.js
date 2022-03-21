import React, { useEffect, useState } from 'react';
import './Shop.css';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { Loading } from '../../GlobalState';

export default function Shop() {
  const [, setPageLoading] = React.useContext(Loading)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // const [value, setValue] = React.useState(4.5);
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);

  const getAllProduct = async (queryString) => {
    try {
      setPageLoading(true)
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
        setProductList(res.data);
        setPageLoading(false)
      }
    } catch (error) {
      setProductList([]);
      setPageLoading(false)
    }
    setLoading(false);
  };
  if (loading) {
    getAllProduct('');
    setLoading(false);
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
                <br />
                <div className="shop-page-detail">
                  <p>{product.name}</p>
                  <div className="shop-page-price">
                    <p>QR {product.price}</p>
                  </div>

                  <div className="shop-page-review">
                    <p>{product.ratingsQuantity} Reviews</p>
                    {/* <br /> */}

                    <Rating
                      className="shop-page-review-rating"
                      name="read-only"
                      style={{
                        paddingLeft: '0px',
                        marginLeft: '0px',
                        // fontSize: ".9rem",
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
      <Footer />
    </>
  );
}
