import React, { useState } from "react";
import "./Product.css";
import Header from "../Header/Header";
import ProductDisplay from "./ProductDisplay/ProductDisplay";
import ReviewDisplay from "./ReviewDisplay/ReviewDisplay";
import CategoryDisplay from "./CategoryDisplay/CategoryDisplay";
import Footer from "../Footer/Footer";

export default function Product() {
  const [productVariantId, setProductVariantId] = useState();
  const [categoryId, setCategoryId] = useState();
  // React.useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "./script.js";
  //   script.async = true;

  //   document.body.appendChild(script);
  // }, []);
  return (
    <>
      <Header />
      <ProductDisplay
        setProductVariantId={setProductVariantId}
        setCategoryId={setCategoryId}
      />
      <CategoryDisplay categoryId={categoryId} />
      <ReviewDisplay productVariantId={productVariantId} />
      <Footer />
    </>
  );
}
