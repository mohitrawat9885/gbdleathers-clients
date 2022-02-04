import React, { useState } from 'react';
import './CheckOut.css';
import EditIcon from '@mui/icons-material/Edit';
import Ripples from 'react-ripples';
import DeleteIcon from '@mui/icons-material/Delete';
// import Ripples from 'react-ripples';

export default function CheckOut() {
  const [addEditAddress, setAddEditAddress] = useState('product');

  const [loadingCart, setLoadingCart] = useState(true);
  const [cartList, setCartList] = useState([]);

  const [addressList, setAddressList] = useState([]);
  const [addressListFetched, setAddressListFetched] = useState(false);

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
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: checkoutAddress,
          }),
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        alert(res.message);
      } else {
        alert('Something went wrong!');
      }
    } catch (err) {}
  };

  const addAddress = async () => {
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/address`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
      if (res.status === 'success') {
        // alert(res.status);
        // setLoading(false);
        resetData();
        getAddress();
        setAddEditAddress('product');
        // setAddressPage('show');
        return;
      } else {
        alert(res.message);
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
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
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
      if (res.status === 'success') {
        // alert(res.status);
        // setLoading(false);
        resetData();
        getAddress();
        setAddEditAddress('product');

        return;
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.log(err);
      alert('Something went wrong!');
    }
    // setLoading(false);
    // navigate('/login');
  };

  const deleteAddress = async (id) => {
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/address/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 204) {
        // alert('Deleted');
        getAddress();
        return;
      }
      alert('Something went wrong! try again.');
    } catch (err) {
      // console.log(err);
      alert('Something went wrong!');
    }
    // setLoading(false);
    // navigate('/login');
  };

  const getAddress = async () => {
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/address`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = JSON.parse(await response.text());
      // alert(res.status);
      if (res.status === 'success') {
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
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        setCartList(res.data);

        // console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      // setProduct({});
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await fetch(`/api/v1/gbdleathers/client/customer/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: productId,
          quantity,
        }),
      });
      console.log('Responce', response.status);
      if (response.status === 204) {
        getCartProducts();
        return;
      }
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        getCartProducts();
      } else {
        // alert(res.status.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function calculateTotal() {
    let total = 0;
    for (let i in cartList) {
      total = total + cartList[i].product.price * cartList[i].quantity;
    }
    return total;
    // alert(total);
  }

  function Addresses() {
    if (!addressListFetched) {
      getAddress();
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
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <input
                    type="radio"
                    name="address"
                    onClickCapture={() => setCheckoutAddress(address._id)}
                    defaultChecked={address.defaultAddress}
                  />

                  <div
                    style={{
                      width: '30%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      // flexDirection: 'row-reverse',
                    }}
                  >
                    <EditIcon
                      fontSize="small"
                      onClick={() => {
                        setData(address);
                        setAddEditAddress('edit');
                      }}
                    />
                    <DeleteIcon
                      fontSize="small"
                      onClick={() => {
                        deleteAddress(address._id);
                        setAddEditAddress('product');
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    paddingLeft: 20,
                    borderBottom: '1px solid gray',
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
              onClick={() => setAddEditAddress('add')}
            >
              <div>
                <p>ADD SHIPPING ADDRESS</p>
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
    if (addEditAddress === 'edit') {
      return (
        <>
          <Ripples>
            <button
              onClick={() => {
                editAddress();
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
                  <p>{cart.product.name}</p>
                </div>
              </div>
              <div className="checkout-product-holder-quantity">
                <div className="checkout-menu-quantity">
                  <div
                    className="checkout-menu-quantity-btn"
                    onClick={() => addToCart(cart.product._id, -1)}
                  >
                    -
                  </div>
                  <p>{cart.quantity}</p>
                  <div
                    className="checkout-menu-quantity-btn"
                    onClick={() => addToCart(cart.product._id, 1)}
                  >
                    +
                  </div>
                </div>
                <DeleteIcon
                  onClick={() => addToCart(cart.product._id, -cart.quantity)}
                />
              </div>
              <div className="checkout-product-holder-price">
                <p>QTR {cart.product.price}</p>
              </div>
              <div className="checkout-product-holder-total">
                <p>QTR {cart.product.price * cart.quantity}</p>
              </div>
            </div>
          ))}
        </>
      );
    }
  }
  function CheckoutProduct() {
    if (addEditAddress === 'add' || addEditAddress === 'edit') {
      return (
        <>
          <div className="checkout-products">
            <div className="checkout-main-display-heading">
              <p>Address</p>
              <p
                style={{
                  fontSize: 18,
                }}
                onClick={() => setAddEditAddress('product')}
              >
                Cancel
              </p>
            </div>
            <br />
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

  return (
    <div className="checkout-div">
      {CheckoutProduct()}
      <div className="checkout-summary">
        <div className="checkout-summary-holder">
          <div className="checkout-summary-heading">
            <p>ORDER SUMMARY</p>
          </div>
          {Addresses()}
          <div className="checkout-summary-total">
            <p>TOTAL COST</p>
            <p>QTR {calculateTotal()}</p>
          </div>
          <Ripples
            onClick={() => checkout()}
            color="white"
            className="checkout-summary-checkout-btn"
          >
            <div>
              <p>CHECK OUT</p>
            </div>
          </Ripples>
        </div>
      </div>
    </div>
  );
}
