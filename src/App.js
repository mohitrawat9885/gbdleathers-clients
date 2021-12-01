import "./App.css";
import React from "react";
import Header from "./Screens/Header/Header";
import Footer from "./Screens/Footer/Footer";

import Home from "./Screens/Home/Home";
import Category from "./Screens/Category/Category";
import Product from "./Screens/Product/Product";
import Categorys from "./Screens/Categorys/Categorys";
import Login from "./Screens/Authentication/Login/Login";
import Signup from "./Screens/Authentication/Signup/Signup";
import ContactUs from "./Screens/ContactUs/ContactUs";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Shop from "./Screens/Shop/Shop";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorys" element={<Categorys />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path={`/category/:categoryId`} element={<Category />} />
          <Route path={`/product/:productId`} element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<Signup />} />
        </Routes>
        <Footer />
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
