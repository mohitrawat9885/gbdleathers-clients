import React, { useEffect, useState } from "react";
import "./CheckOut.css";
import EditIcon from "@mui/icons-material/Edit";
import Ripples from "react-ripples";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactLoading from "react-loading";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { useAlert } from "react-alert";

export default function CheckOut() {
  const alert = useAlert();
  const [addEditAddress, setAddEditAddress] = useState("product");

  const [loadingCart, setLoadingCart] = useState(true);
  const [cartList, setCartList] = useState([]);

  const [addressList, setAddressList] = useState([]);
  const [addressListFetched, setAddressListFetched] = useState(false);

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [addressId, setAddressId] = useState();
  const [checkoutAddress, setCheckoutAddress] = useState();
  // const [addressPage, setAddressPage] = useState('edit');
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [address_1, setAddress1] = useState();
  const [address_2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [province, setProvince] = useState();
  const [postal_zip_code, setPostalZipCode] = useState();
  const [phone, setPhone] = useState();
  const [defaultAddress, setDefaultAddress] = useState(false);

  function resetData() {
    setAddressId(null);
    setFirstName(null);
    setLastName(null);
    setAddress1(null);
    setAddress2(null);
    setCity(null);
    setCountry(null);
    setProvince(null);
    setPostalZipCode(null);
    setPhone(null);
    setDefaultAddress(false);
  }
  function setData(address) {
    setAddressId(address._id);
    setFirstName(address.first_name);
    setLastName(address.last_name);
    setAddress1(address.address_1);
    setAddress2(address.address_2);
    setCity(address.city);
    setCountry(address.country);
    setProvince(address.province);
    setPostalZipCode(address.postal_zip_code);
    setPhone(address.phone);
    setDefaultAddress(address.defaultAddress);
  }

  const checkout = async () => {
    try {
      setCheckoutLoading(true);
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: checkoutAddress,
          }),
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        setTimeout(() => {
          alert.success(res.message);
          setTimeout(() => {
            window.location = res.payment_url;
          }, 2500);
          setCheckoutLoading(false);
        }, 2000);
      } else {
        setCheckoutLoading(false);
        alert.error(res.message);
      }
    } catch (err) {
      alert.error("Something went wrong try again later!");
      setCheckoutLoading(false);
    }
  };

  const addAddress = async () => {
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name,
            last_name,
            address_1,
            address_2,
            city,
            country,
            province,
            postal_zip_code,
            phone,
            defaultAddress,
          }),
        }
      );
      const res = JSON.parse(await response.text());
      // alert(res.status);
      if (res.status === "success") {
        // alert(res.status);
        // setLoading(false);
        alert.success(res.message);
        resetData();
        getAddress();
        setAddEditAddress("product");
        // setAddressPage('show');
        return;
      } else {
        alert.error(res.message);
      }
    } catch (err) {}
    // setLoading(false);
    // navigate('/login');
  };

  const editAddress = async () => {
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/address/${addressId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name,
            last_name,
            address_1,
            address_2,
            city,
            country,
            province,
            postal_zip_code,
            phone,
            defaultAddress,
          }),
        }
      );

      const res = JSON.parse(await response.text());
      // alert(res.status);
      if (res.status === "success") {
        // alert(res.status);
        // setLoading(false);
        alert.success(res.message);
        resetData();
        getAddress();
        setAddEditAddress("product");
        return;
      } else {
        alert.error(res.message);
      }
    } catch (err) {
      // console.log(err);
      alert.error("Something went wrong!");
    }
    // setLoading(false);
    // navigate('/login');
  };

  const deleteAddress = async (id) => {
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/address/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 204) {
        // alert('Deleted');
        alert.success("Deleted!");
        getAddress();
        return;
      }
      alert.error("Something went wrong! try again.");
    } catch (err) {
      // console.log(err);
      alert.error("Something went wrong!");
    }
    // setLoading(false);
    // navigate('/login');
  };

  const getAddress = async () => {
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/address`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = JSON.parse(await response.text());
      // alert(res.status);
      if (res.status === "success") {
        setAddressList(res.data);

        setAddressListFetched(true);
        // console.log(res.data);
      } else {
        // alert(res.message);
      }
    } catch (err) {}
    // setLoading(false);
    // navigate('/login');
  };

  const getCartProducts = async () => {
    try {
      const response = await fetch(`/api/v1/gbdleathers/client/customer/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        let doc = res.data;
        for (let i = 0; i < doc.length; i++) {
          if (doc[i].onModel === "Variants") {
            let product = doc[i].product;
            // console.log(product);
            let variant_of = product.variant_of;
            product.subName = " - " + product.name;
            product.name = variant_of.name;

            if (!product.category) product.category = variant_of.category;
            if (!product.front_image)
              product.front_image =
                variant_of.front_image || variant_of.images[0] || "";
            if (!product.back_image)
              product.back_image =
                variant_of.back_image || variant_of.images[1] || "";
            if (!product.price) product.price = variant_of.price;
            if (!product.stock) product.stock = variant_of.stock;
            if (!product.summary) product.summary = variant_of.summary;
            if (!product.description)
              product.description = variant_of.description;
            if (!product.images && product.images.length < 1)
              product.images = variant_of.images;

            doc[i].product = product;
          }
        }
        setCartList(doc);

        // console.log(res.data);
      }
    } catch (error) {
      // console.log(error);
      // setProduct({});
    }
  };
  useEffect(() => {
    getCartProducts();
    getAddress();
  }, []);

  const addToCart = async (productId, quantity, multi_properties) => {
    try {
      const response = await fetch(`/api/v1/gbdleathers/client/customer/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: productId,
          quantity,
          multi_properties,
        }),
      });
      // console.log("Responce", response.status);
      if (response.status === 204) {
        getCartProducts();
        return;
      }
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        getCartProducts();
      } else {
        alert.error(res.message);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  function calculateTotal() {
    let total = 0;
    for (let i in cartList) {
      total = total + cartList[i].product.price * cartList[i].quantity;
    }
    return total.toFixed(2);
    // alert(total);
  }

  function GetCheckoutButton() {
    if (checkoutLoading) {
      return (
        <Ripples
          // onClick={() => {
          //   window.scroll(0, 0);
          //   checkout();
          // }}
          color="rgb(58, 58, 58)"
          className="checkout-summary-checkout-btn"
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              // height: '100%',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReactLoading type="spin" color="white" height={22} width={22} />
          </div>
        </Ripples>
      );
    }
    return (
      <>
        <Ripples
          onClick={() => {
            checkout();
          }}
          color="white"
          className="checkout-summary-checkout-btn"
        >
          <div>
            <span>CHECK OUT</span>
          </div>
        </Ripples>
      </>
    );
  }

  function Addresses() {
    if (!addressListFetched) {
      return <p>Loading...</p>;
    } else {
      return (
        <>
          <div className="checkout-summary-addresses">
            <div>
              <p>Shipping Address</p>
            </div>
            <br />

            {addressList.map((address, index) => (
              <div key={index}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <input
                    style={{
                      cursor: "pointer",
                    }}
                    type="radio"
                    name="address"
                    onClickCapture={() => setCheckoutAddress(address._id)}
                    // defaultChecked={address.defaultAddress}
                  />
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between",
                      // flexDirection: 'row-reverse',
                    }}
                  >
                    <EditIcon
                      fontSize="small"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setData(address);
                        setAddEditAddress("edit");
                      }}
                    />
                    <DeleteIcon
                      fontSize="small"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        deleteAddress(address._id);
                        setAddEditAddress("product");
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    paddingLeft: 20,
                    borderBottom: "1px solid gray",
                    paddingBottom: 10,
                    marginBottom: 10,
                  }}
                >
                  <p>
                    {address.first_name} {address.last_name}
                  </p>
                  <p>
                    {address.address_1}, {address.address_2}
                  </p>
                  <p>
                    {address.city} {address.country}
                  </p>
                  <p>
                    {address.postal_zip_code} {address.province}
                  </p>
                  <p>{address.phone}</p>
                </div>
              </div>
            ))}
            <Ripples
              color="white"
              className="checkout-summary-add-address-btn"
              onClick={() => {
                setAddEditAddress("add");
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <div>
                <span>ADD SHIPPING ADDRESS</span>
              </div>
            </Ripples>
          </div>
        </>
      );
    }
    // } else {
    //   return (
    //     <div className="checkout-summary-addresses">
    //       <div>
    //         <p>Shipping Address</p>
    //       </div>
    //       <br />
    //       <Ripples
    //         color="white"
    //         className="checkout-summary-add-address-btn"
    //         onClick={() => setAddEditAddress('add')}
    //       >
    //         <div>
    //           <p>ADD SHIPPING ADDRESS</p>
    //         </div>
    //       </Ripples>
    //     </div>
    //   );
    // }
  }

  function AddressSubmitButton() {
    if (addEditAddress === "edit") {
      return (
        <>
          <Ripples>
            <button
              onClick={() => {
                editAddress();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              UPDATE ADDRESS
            </button>
          </Ripples>
        </>
      );
    } else {
      return (
        <Ripples>
          <button
            onClick={() => {
              addAddress();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            ADD ADDRESS
          </button>
        </Ripples>
      );
    }
  }
  function RenderCartProducts() {
    if (loadingCart) {
      getCartProducts();
      setLoadingCart(false);
      return <h3>Loading...</h3>;
    } else {
      return (
        <>
          {cartList.map((cart, index) => (
            <div className="checkout-product-holder" key={index}>
              <div className="checkout-product-holder-details">
                <div className="checkout-product-holder-details-img">
                  <img src={`/images/${cart.product.front_image}`} alt="" />
                </div>

                <div className="checkout-product-holder-details-1">
                  <p>
                    {cart.product.name} {cart.product.subName}
                  </p>
                  {/* <div className="checkout-menu-product-detail-multi_properties"> */}
                  {cart.multi_properties.map((p, i) => (
                    <div>
                      <p>
                        <b>{p.name}</b> : {p.value}
                      </p>
                    </div>
                  ))}
                  {/* </div> */}
                </div>
              </div>
              <div className="checkout-product-holder-quantity">
                <div className="checkout-menu-quantity">
                  <div
                    className="checkout-menu-quantity-btn"
                    onClick={() =>
                      addToCart(cart.product._id, -1, cart.multi_properties)
                    }
                  >
                    -
                  </div>
                  <p>{cart.quantity}</p>
                  <div
                    className="checkout-menu-quantity-btn"
                    onClick={() =>
                      addToCart(cart.product._id, 1, cart.multi_properties)
                    }
                  >
                    +
                  </div>
                </div>
                <DeleteIcon
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    addToCart(
                      cart.product._id,
                      -cart.quantity,
                      cart.multi_properties
                    )
                  }
                />
              </div>
              <div className="checkout-product-holder-price">
                <p>QTR {cart.product.price}</p>
              </div>
              <div className="checkout-product-holder-total">
                <p>QTR {(cart.product.price * cart.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </>
      );
    }
  }
  function CheckoutProduct() {
    if (addEditAddress === "add" || addEditAddress === "edit") {
      return (
        <>
          <div className="checkout-products">
            <div className="checkout-main-display-heading">
              <p>Address</p>
              <p
                style={{
                  fontSize: 18,
                  cursor: "pointer",
                }}
                onClick={() => setAddEditAddress("product")}
              >
                Cancel
              </p>
            </div>
            {/* <br /> */}
            <div className="checkout-main-display-add-address">
              <div className="checkout-main-display-add-address-section-1">
                <div className="checkout-main-display-add-address-section-1-1">
                  <label htmlFor="first_name">FIRST NAME</label>
                  <br />
                  <input
                    id="first_name"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div></div>
                <div className="checkout-main-display-add-address-section-1-1">
                  <label htmlFor="last_name">LAST NAME</label>
                  <br />
                  <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="checkout-main-display-add-address-section-2">
                <label htmlFor="address_1">ADDRESS 1</label>
                <br />
                <input
                  id="address_1"
                  type="text"
                  value={address_1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </div>
              <div className="checkout-main-display-add-address-section-2">
                <label htmlFor="address_2">ADDRESS 2</label>
                <br />
                <input
                  id="address_2"
                  type="text"
                  value={address_2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>

              <div className="checkout-main-display-add-address-section-2">
                <label htmlFor="city">CITY</label>
                <br />
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="checkout-main-display-add-address-section-2">
                <label htmlFor="country">COUNTRY</label>
                <br />
                <input
                  id="country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              <div className="checkout-main-display-add-address-section-2">
                <label htmlFor="province">PROVINCE</label>
                <br />
                <input
                  id="province"
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </div>

              <div className="checkout-main-display-add-address-section-1">
                <div className="checkout-main-display-add-address-section-1-1">
                  <label htmlFor="post_zip_code">POSTAL/ZIP CODE</label>
                  <br />
                  <input
                    id="post_zip_code"
                    type="number"
                    value={postal_zip_code}
                    onChange={(e) => setPostalZipCode(e.target.value)}
                  />
                </div>
                <div></div>
                <div className="checkout-main-display-add-address-section-1-1">
                  <label htmlFor="phone">PHONE</label>
                  <br />
                  <input
                    id="phone"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="checkout-main-display-add-address-setdefault">
                <label htmlFor="set_default">SET AS DEFAULT</label>
                <br />
                <input
                  style={{
                    width: 20,
                    cursor: "pointer",
                  }}
                  id="set_default"
                  type="checkbox"
                  checked={defaultAddress}
                  onChange={() => setDefaultAddress(!defaultAddress)}
                />
              </div>
              <br />
              <div className="checkout-main-display-add-address-btn">
                <AddressSubmitButton />
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="checkout-products">
          <div className="checkout-product-heading">
            <p>Cart</p>
          </div>

          <div className="checkout-product-info-tag">
            <p>PRODUCT DETAILS</p>
            <p>QUANTITY</p>
            <p>PRICE</p>
            <p>TOTAL</p>
          </div>
          {RenderCartProducts()}
        </div>
      );
    }
  }
  if (cartList.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: "80vh",
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'center',
          // alignItems: "center"
        }}
      >
        <span
          style={{
            marginTop: "4rem",
            fontSize: "2.2rem",
            textAlign: "center",
            width: "100%",
            display: "block",
            letterSpacing: ".1rem",
          }}
        >
          Your Cart is Empty
        </span>
        <br />
        <span
          onClick={() => (window.location = "/shop")}
          style={{
            fontSize: "1.4rem",
            textAlign: "center",
            width: "100%",
            display: "block",
            cursor: "pointer",
            color: "gray",
          }}
        >
          Click here to Shop <ShoppingBasketIcon />
        </span>
      </div>
    );
  } else
    return (
      <>
        <div className="checkout-div">
          {CheckoutProduct()}
          <div className="checkout-summary">
            <div className="section checkout-summary-holder">
              <div className="checkout-summary-heading">
                <p>ORDER SUMMARY</p>
              </div>
              {Addresses()}
              <div className="checkout-summary-total">
                <p>TOTAL COST</p>
                <p>QTR {calculateTotal()}</p>
              </div>
              {GetCheckoutButton()}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "50vh",
          }}
        ></div>
      </>
    );
}
