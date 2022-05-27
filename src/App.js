import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Screens/Header/Header";
import Footer from "./Screens/Footer/Footer";

import Home from "./Screens/Home/Home";
import Category from "./Screens/Category/Category";
import Product from "./Screens/Product/Product";
import Categorys from "./Screens/Categorys/Categorys";
import Login from "./Screens/Authentication/Login/Login";
import Signup from "./Screens/Authentication/Signup/Signup";
import ResetPassword from "./Screens/Authentication/Login/ResetPassword";
import MyAccount from "./Screens/MyAccount/MyAccount";
import ContactUs from "./Screens/ContactUs/ContactUs";
import CheckOut from "./Screens/CheckOut/CheckOut";
// import Workshop from "./Screens/Workshop/Workshop/Workshop";
import Workshops from "./Screens/Workshop/Workshops/Workshops";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Screens/Shop/Shop";
import GlobalState, { Loading } from "./GlobalState";

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
  containerStyle: {
    zIndex: 1000,
  },
};

// /api/v1/gbdleathers
global.api = "/api/v1/gbdleathers";
global.image_path = "/images/";

// global.api = 'https://gbdleathers.com:8000/api/v1/gbdleathers';
// global.image_path = 'https://gbdleathers.com:8000/images/';

global.isLogin = false;
function App() {
  const [cartMenu, setCartMenu] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  React.useEffect(() => {
    window.scroll(0, 0);
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

    let menuOptions = document.querySelectorAll(".section_2");
    menuOptions.forEach(function (menu) {
      menu.classList.add("section--hidden");
    });
  }, []);
  return (
    <>
      <GlobalState.Provider value={[cartMenu, setCartMenu]}>
        <Loading.Provider value={[pageLoading, setPageLoading]}>
          <Provider template={AlertTemplate} {...options}>
            <Router>
              {/* <ScrollToTop> */}
              {/* <Header /> */}
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      {/* <Header /> */}
                      <Home />
                      {/* <Footer /> */}
                    </>
                  }
                />
                <Route
                  path="/categorys"
                  element={
                    <>
                      {/* <Header /> */}
                      <Categorys />
                      {/* <Footer /> */}
                    </>
                  }
                />
                <Route
                  path="/shop"
                  element={
                    <>
                      {/* <Header /> */}
                      <Shop />
                      {/* <Footer /> */}
                    </>
                  }
                />
                <Route
                  path="/contact-us"
                  element={
                    <>
                      {/* <Header /> */}
                      <ContactUs />
                      {/* <Footer /> */}
                    </>
                  }
                />
                <Route
                  path={`/category/:categoryId`}
                  element={
                    <>
                      {/* <Header /> */}
                      <Category />
                      {/* <Footer /> */}
                    </>
                  }
                />
                <Route
                  path={`/product/:productId`}
                  element={
                    <>
                      {/* <Header /> */}
                      <Product />
                      {/* <Footer /> */}
                    </>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <>
                      {/* <Header /> */}
                      <Login />
                      {/* <Footer /> */}
                    </>
                  }
                />

                <Route
                  path="/reset-password/:passwordToken"
                  element={
                    <>
                      {/* <Header /> */}
                      <ResetPassword />
                      {/* <Footer /> */}
                    </>
                  }
                />
                <Route
                  path="/create-account"
                  element={
                    <>
                      {/* <Header /> */}
                      <Signup />
                      {/* <Footer /> */}
                    </>
                  }
                />
                <Route
                  path="/my-account"
                  element={
                    <>
                      <Header />
                      <MyAccount />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/check-out"
                  element={
                    <>
                      <Header />
                      <CheckOut />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/workshops/:type"
                  element={
                    <>
                      <Header />
                      <Workshops />
                      <Footer />
                    </>
                  }
                />
                {/* <Route
                  path="/workshop/:id"
                  element={
                    <>
                      <Header />
                      <Workshop />
                      <Footer />
                    </>
                  }
                /> */}
              </Routes>
            </Router>
          </Provider>
        </Loading.Provider>
      </GlobalState.Provider>
    </>
  );
}

export default App;
