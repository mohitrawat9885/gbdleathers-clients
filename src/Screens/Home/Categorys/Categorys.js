import React, { useState } from 'react';
import './Categorys.css';
import { Link } from 'react-router-dom';
import {Loading} from "../../../GlobalState"
import Rating from '@mui/material/Rating';

export default function Categorys() {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productListLoading, setProductListLoading] = useState(true)
  const [, setPageLoading] = React.useContext(Loading)

  const getProductList = async (queryString) => {
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
        console.log("products", res.data)
        // setNumberOfDocument(res.totalDocument)
        setPageLoading(false)
        setProductListLoading(false)
        // console.log(res.data)
      }
    } catch (error) {
      setProductList([]);
      setPageLoading(false)
    }
    setLoading(false);
  };

  const getAllCategorys = async (quaryString, list) => {
    try {
      setPageLoading(true)
      const response = await fetch(
        `${global.api}/client/category?${quaryString}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
          setCategoryList(res.data)
          setCategoryList(res.data);
        }
        setPageLoading(false)
    } catch (error) {
      setCategoryList([]);
      setPageLoading(false)
    }
    // setLoading(false);
  };
  if (loading) {
    getAllCategorys('page=1&limit=6', 1);
    // getAllCategorys('skip=6', 2);
    setLoading(false);
  }
  // React.useEffect(() => {
  //   getAllCategorys();
  // });

  function GetProducts() {
    if (productListLoading) {
      getProductList("?page=1&limit=20");
      return <>Loading...</>;
    }
    return (
      <div className="category-page-parent" style={{
        marginTop: "6rem",
        // marginBottom: '15rem'
      }}>

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
          height: "50vh"
        }}></div>
      </div>
    );
  }
  return (
    <>
      <div className="home-categoryBody">
        {/* <div className="categoryDiv"> */}
        <div className="home-category-section-1">
          {/*  */}
          {categoryList.map((d) => (
            <div className="home-category-holder">
              <Link to={`category/${d._id}`} style={{ textDecoration: 'none' }}>
                <div className="home-category-img img-wrapper">
                  <img
                    src={`${global.image_path}${d.image}`}
                    alt=""
                    className="hover-zoom"
                  />
                </div>

                <div className="home-category-btn">
                  <span>{d.name}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* <div className="home-category-section-2"> */}
{GetProducts()}
        {/* </div> */}
      </div>
    </>
  );
}
