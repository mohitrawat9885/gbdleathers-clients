import React, { useState, useEffect } from 'react';
import './Category.css';
import { useParams, Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Category() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { categoryId } = useParams();
  // const [value, setValue] = React.useState(4.5);
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [category, setCategory] = useState([]);

  const getCategory = async (quaryString, list) => {
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
        setCategory(res.data);
        setProductList(res.data.products);
        console.log(res.data);
      }
    } catch (error) {
      setCategory([]);
    }
    setLoading(false);
  };
  if (loading) {
    getCategory();
    setLoading(false);
  }
  return (
    <>
      <Header />
      <div className="category-page-parent">
        <div className="category-page-heading">
          <span>{category.name}</span>
        </div>
        <div className="category-page-body">
          {productList.map((product, index) => (
            <div className="category-page-holder" key={index}>
              <Link
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
                      value={parseInt(product.ratingsAverage)}
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
