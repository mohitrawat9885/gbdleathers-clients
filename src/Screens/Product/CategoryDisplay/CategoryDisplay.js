import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
export default function CategoryDisplay(props) {
  const [productList, setProductList] = useState(undefined);
  async function getCategory() {
    try {
      const response = await fetch(
        `${global.api}/client/category/${props.categoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        setProductList(res.data.products);
        // setProductListLoading(false);
      } else {
        setProductList(undefined);
      }
    } catch (error) {
      setProductList(undefined);
    }
    // setLoading(false);
  }

  React.useEffect(() => {
    //   console.log()
    if (props.categoryId) getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.categoryId]);

  if (!props.categoryId || !productList || productList.length === 0) {
    return <></>;
  }

  return (
    <div
      className="category-page-parent"
      style={{
        marginTop: "3rem",
        // marginBottom: '15rem'
      }}
    >
      <div
        className="category-page-heading"
        style={{
          marginBottom: "6rem",
        }}
      >
        <span>PRODUCTS WITH SAME CATEGORY</span>
      </div>
      <div className="category-page-body">
        {productList.map((product, index) => (
          <div className="category-page-holder" key={index}>
            <Link
              // onClick={() => refreshPage()}
              to={`/product/${product._id}`}
              style={{ textDecoration: "none" }}
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
      <div
        style={{
          width: "100%",
          height: "20vh",
        }}
      ></div>
    </div>
  );
}
