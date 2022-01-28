import React, { useEffect, useState } from 'react';
import './Categorys.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Categorys() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  const getAllCategorys = async (quaryString) => {
    try {
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
        setCategoryList(res.data);
      }
    } catch (error) {
      setCategoryList([]);
    }
    setLoading(false);
  };
  if (loading) {
    getAllCategorys('');

    setLoading(false);
  }
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
                style={{ textDecoration: 'none' }}
              >
                <div className="categorys-category-img-2">
                  <img src={`${global.image_path}${category.image}`} alt="" />
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
