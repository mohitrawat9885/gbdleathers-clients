import React, { useState } from 'react';
import './Categorys.css';


import { Link } from 'react-router-dom';
import {Loading} from "../../../GlobalState"

export default function Categorys() {
  const [loading, setLoading] = useState(true);
  const [categoryList1, setCategoryList1] = useState([]);
  const [categoryList2, setCategoryList2] = useState([]);
  const [, setPageLoading] = React.useContext(Loading)

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
        if (list === 1) {
          setCategoryList1(res.data);
        } else {
          setCategoryList2(res.data);
        }
        setPageLoading(false)
      }
    } catch (error) {
      setCategoryList1([]);
      setCategoryList2([]);
      setPageLoading(false)
    }
    setLoading(false);
  };
  if (loading) {
    getAllCategorys('page=1&limit=6', 1);
    getAllCategorys('skip=6', 2);
    setLoading(false);
  }
  // React.useEffect(() => {
  //   getAllCategorys();
  // });
  return (
    <>
      <div className="home-categoryBody">
        {/* <div className="categoryDiv"> */}
        <div className="home-category-section-1">
          {/*  */}
          {categoryList1.map((d) => (
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

        <div className="home-category-section-2">
          {categoryList2.map((category, index) => (
            <div className="home-category-holder-2" key={index}>
              <Link
                to={`category/${category._id}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="home-category-img-2 img-wrapper">
                  <img
                    src={`${global.image_path}${category.image}`}
                    alt=""
                    className="hover-zoom"
                  />
                </div>
                <div className="home-category-name">
                  <p>{category.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
