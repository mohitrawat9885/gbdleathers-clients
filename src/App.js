import './App.css';
import React, { useEffect } from 'react';

import Header from './Screens/Header/Header';
import Footer from './Screens/Footer/Footer';

import Home from './Screens/Home/Home';
import Category from './Screens/Category/Category';
import Product from './Screens/Product/Product';
import Categorys from './Screens/Categorys/Categorys';
import Login from './Screens/Authentication/Login/Login';
import Signup from './Screens/Authentication/Signup/Signup';
import MyAccount from './Screens/MyAccount/MyAccount';
import ContactUs from './Screens/ContactUs/ContactUs';
import CheckOut from './Screens/CheckOut/CheckOut';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';
import Shop from './Screens/Shop/Shop';

// /api/v1/gbdleathers
global.api = '/api/v1/gbdleathers';
global.image_path = '/images/';

// global.api = 'https://gbdleathers.com:8000/api/v1/gbdleathers';
// global.image_path = 'https://gbdleathers.com:8000/images/';

global.isLogin = false;
function App() {
  return (
    <>
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
        </Routes>
      </Router>
    </>
  );
}

export default App;

// <Router>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 <Header />
//                 <Home />
//                 <Footer />
//               </>
//             }
//           />
//           <Route
//             path="/categorys"
//             element={
//               <>
//                 <Header />
//                 <Categorys />
//                 <Footer />
//               </>
//             }
//           />
//           <Route
//             path="/shop"
//             element={
//               <>
//                 <Header />
//                 <Shop />
//                 <Footer />
//               </>
//             }
//           />
//           <Route
//             path="/contact-us"
//             element={
//               <>
//                 <Header />
//                 <ContactUs />
//                 <Footer />
//               </>
//             }
//           />
//           <Route
//             path={`/category/:categoryId`}
//             element={
//               <>
//                 <Header />
//                 <Category />
//                 <Footer />
//               </>
//             }
//           />
//           <Route
//             path={`/product/:productId`}
//             element={
//               <>
//                 <Header />
//                 <Product />
//                 <Footer />
//               </>
//             }
//           />
//           <Route
//             path="/login"
//             element={
//               <>
//                 <Header />
//                 <Login />
//                 <Footer />
//               </>
//             }
//           />
//           <Route
//             path="/create-account"
//             element={
//               <>
//                 <Header />
//                 <Signup />
//                 <Footer />
//               </>
//             }
//           />
//         </Routes>
//       </Router>
