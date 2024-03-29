import React, { useEffect, useState } from "react";
import "./Categorys.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { Loading } from "../../GlobalState";

export default function Categorys() {
  const [, setPageLoading] = React.useContext(Loading);

  const [, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  const getAllCategorys = async (quaryString) => {
    try {
      setPageLoading(true);
      const response = await fetch(
        `${global.api}/client/category?${quaryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        setCategoryList(res.data);
        setPageLoading(false);
      }
    } catch (error) {
      setCategoryList([]);
      setPageLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllCategorys("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className="categorys-categoryBody">
        <div className="categorys-category-page-heading">
          <span>SHOP CATEGORY WISE</span>
        </div>
        <div className="categorys-category-section-2">
          {categoryList.map((category, index) => (
            <div className="categorys-category-holder-2" key={index}>
              <Link
                to={`/category/${category._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="categorys-category-img-2 img-wrapper">
                  <img
                    src={`${global.image_path}${category.image}`}
                    alt=""
                    className="hover-zoom"
                  />
                </div>

                <div className="categorys-category-name">
                  <p>{category.name}</p>
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
