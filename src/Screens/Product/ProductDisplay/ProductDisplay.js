import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import GlobalState, { Loading } from "../../../GlobalState";
import ReactLoading from "react-loading";
import Rating from "@mui/material/Rating";
import Ripple from "react-ripples";
import ImageGallery from "react-image-gallery";

import { useAlert } from "react-alert";
import RippleIndicator from "../RippleIndicator/RippleIndicator";

export default function ProductDisplay(props) {
  const [, setPageLoading] = React.useContext(Loading);
  const alert = useAlert();
  const [product, setProduct] = React.useState({
    index: 0,
    list: [],
  });
  const [multiProperties, setMultiproperties] = useState({});
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [, setCartMenu] = useContext(GlobalState);
  let { productId } = useParams();
  const getProduct = async () => {
    try {
      setPageLoading(true);

      const response = await fetch(
        `${global.api}/client/product/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        props.setCategoryId(res.data?.category?._id);

        if (!res.data.front_image)
          res.data.front_image = res.data.images[0] ? res.data.images[0] : "";
        if (!res.data.back_image)
          res.data.back_image = res.data.images[1] ? res.data.images[1] : "";
        let proList = [];
        if (res.data.multi_properties) {
          let mp = {};
          for (let i in res.data.multi_properties) {
            let obj = {
              name: i,
              values: res.data.multi_properties[i],
            };
            mp[i] = res.data.multi_properties[i][0];
            proList.push(obj);
          }
          // console.log(mp);
          setMultiproperties(mp);
        }
        res.data.multi_properties = proList;

        if (res.data.variants?.length === 0) {
          setProduct(() => {
            let newPrd = { index: 0, list: [] };
            newPrd.list.push(res.data);
            return newPrd;
          });

          props.setProductVariantId({
            ratingsQuantity: res.data.ratingsQuantity,
            ratingsAverage: res.data.ratingsAverage,
            id: res.data._id,
          });
        } else {
          let list = res.data.variants.map((variant, i) => {
            if (variant.images.length === 0) {
              variant.images = res.data.images;
            }
            variant.front_image = variant.front_image || res.data.front_image;
            variant.back_image = variant.back_image || res.data.back_image;
            if (variant.name) {
              variant.name = res.data.name + "-" + variant.name;
            } else {
              variant.name = res.data.name;
            }
            variant.stock = variant.stock || res.data.stock;
            variant.price = variant.price || res.data.price;
            variant.summary = variant.summary || res.data.summary;
            variant.description = variant.description || res.data.description;

            if (variant.multi_properties) {
              // console.log("MPi 2", variant.multi_properties);
              let proList = [];
              for (let i in variant.multi_properties) {
                let obj = {
                  name: i,
                  values: variant.multi_properties[i],
                };
                proList.push(obj);
              }
              variant.multi_properties = proList;
            } else {
              variant.multi_properties = res.data.multi_properties;
            }
            // console.log(variant);
            return variant;
          });

          setProduct((prd) => {
            let newPrd = { ...prd };
            newPrd.list = list;
            return newPrd;
          });

          props.setProductVariantId({
            ratingsQuantity: list[0].ratingsQuantity,
            ratingsAverage: list[0].ratingsAverage,
            id: list[0]._id,
          });
          // console.log("list", list);
        }
      }
    } catch (error) {
      // console.log(error);
    } finally {
      setPageLoading(false);
    }
  };
  const addToCart = async () => {
    try {
      // setCartMenu((v) => !v)
      let multi_properties = [];
      // let single_properties = [];

      for (let i in multiProperties) {
        let proObj = {
          name: i,
          value: multiProperties[i],
        };
        // console.log(multiProperties[i]);
        multi_properties.push(proObj);
      }
      // console.log(multiProperties);
      // return;
      setAddToCartLoading(true);
      const response = await fetch(`/api/v1/gbdleathers/client/customer/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: product.list[product.index]._id,
          multi_properties,
        }),
      });
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
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
  React.useEffect(() => {
    getProduct();
    window.scroll(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  React.useEffect(() => {
    const allSections = document.querySelectorAll(".section");

    const revealSection = function (entries, observer) {
      const [entry] = entries;

      if (!entry.isIntersecting) return;

      entry.target.classList.remove("section--hidden");
      observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.1,
    });

    allSections.forEach(function (section) {
      sectionObserver.observe(section);
      section.classList.add("section--hidden");
    });
  }, []);

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
  function ShowProperties() {
    if (product.list[product.index]?.multi_properties.length === 0) {
      return <></>;
    }
    return (
      <>
        <div className="product-variants-div">
          {product.list[product.index]?.multi_properties.map(
            (properti, index) => (
              <div key={index}>
                <label htmlFor={properti.name}>
                  {properti.name.toUpperCase()}
                </label>
                <br />
                <select
                  onChange={(e) => {
                    // console.log("Changed", e.target.name, e.target.value);
                    setMultiproperties((mp) => {
                      let newMp = { ...mp };
                      newMp[e.target.name] = e.target.value;
                      return newMp;
                    });
                  }}
                  value={multiProperties[properti.name]}
                  className="product-variant-multi_properties"
                  name={properti.name}
                  id={properti.name}
                >
                  {properti?.values?.map((value, i) => (
                    <option key={i} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            )
          )}
        </div>
      </>
    );
  }

  const properties = {
    thumbnailPosition: "bottom",
    useBrowserFullscreen: false,
    slideOnThumbnailOver: true,
    showPlayButton: false,
    // renderItem: myRenderItem.bind(this),
  };

  function GetProductImages() {
    if (product.list.length !== 0) {
      // console.log(product);
      return product.list[product.index].images.map((img) => ({
        original: `${global.image_path}/${img}`,
        thumbnail: `${global.image_path}/${img}`,
      }));
    }
    return [];
  }
  function loadPage() {
    setPageLoading(true);
    setTimeout(() => {
      setPageLoading(false);
    }, 700);
    window.scroll(0, 0);
  }

  const VariationList = () => {
    if (product.list.length <= 1) {
      return <></>;
    }
    return (
      <div className="shop-page-parent">
        <div className="shop-page-heading">
          <span>YOU MAY LIKE IT'S VARIATIONS</span>
        </div>
        <div className="shop-page-body">
          {product.list.map((p, index) => {
            // if (index === product.index) {
            //   return <></>;
            // }
            return (
              <div
                className="shop-page-holder"
                style={{
                  cursor: "pointer",
                }}
                key={index}
                onClick={() => {
                  loadPage();
                  setProduct((prd) => {
                    let newPrd = { ...prd };
                    newPrd.index = index;
                    return newPrd;
                  });
                  props.setProductVariantId(p._id);
                  props.setProductVariantId({
                    ratingsQuantity: p.ratingsQuantity,
                    ratingsAverage: p.ratingsAverage,
                    id: p._id,
                  });
                }}
              >
                <div className="shop-page-img">
                  <img
                    src={`${global.image_path}${p.front_image}`}
                    onMouseOver={(e) =>
                      (e.currentTarget.src = `${global.image_path}${p.back_image}`)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.src = `${global.image_path}${p.front_image}`)
                    }
                    alt=""
                  />
                </div>
                <div className="shop-page-detail">
                  <p>{p.name.toUpperCase()}</p>
                  <div className="shop-page-price">
                    <p>QR {p.price}</p>
                  </div>

                  <div className="shop-page-review">
                    {/* <br /> */}

                    <Rating
                      className="shop-page-review-rating"
                      name="read-only"
                      size="small"
                      precision={0.5}
                      value={parseFloat(p.ratingsAverage)}
                      readOnly
                    />
                    <p>{p.ratingsQuantity} reviews</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="section product-body">
        <div className="product-gallery">
          <ImageGallery items={GetProductImages()} {...properties} />
        </div>
        <div className="product-details-section">
          <div className="product-detail-heading">
            <p>{product.list[product.index]?.name?.toUpperCase()}</p>
          </div>
          <div className="product-detail-price">
            <p>QR {product.list[product.index]?.price} </p>
            <div className="product-detail-rating">
              <Rating
                className="product-detail-rating-rate"
                name="simple-controlled"
                precision={0.5}
                value={parseFloat(product.list[product.index]?.ratingsAverage)}
                size="small"
                style={{
                  paddingLeft: "0.7rem",
                }}
                readOnly
              />
              <p>{product.list[product.index]?.ratingsQuantity} reviews</p>
            </div>
          </div>
          <div
            style={{
              width: "70%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* <ShowVariants /> */}
            <ShowProperties />
          </div>
          <div className="product-detail-indicators">
            <RippleIndicator stock={product.list[product.index]?.stock} />
            <p>{product.list[product.index]?.stock} Stock</p>
          </div>
          {AddToCartButton()}
          <div className="product-detail-description">
            <h5>Summary</h5>
            <br />
            <p>{product.list[product.index]?.summary}</p>
          </div>
          <div className="product-detail-description">
            <h5>Description</h5>
            <br />
            <p>{product.list[product.index]?.description}</p>
          </div>
        </div>
      </div>
      <div className="section">
        <VariationList />
      </div>
      {/* 
      <div
        style={{
          width: "100%",
          height: "30vh",
        }}
      ></div> */}
    </>
  );
}
