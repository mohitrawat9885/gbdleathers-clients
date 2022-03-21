import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Ripples from 'react-ripples';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddLocationOutlinedIcon from '@mui/icons-material/AddLocationOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
// import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

// import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './MyAccount.css';

import {Loading} from "../../GlobalState"

import { useAlert } from "react-alert";
// import { Phone } from '@mui/icons-material';
export default function MyAccount() {
  const [, setPageLoading] = React.useContext(Loading)
  const alert = useAlert();
  const search = useLocation().search;
  const option = new URLSearchParams(search).get('option');

  // alert(name);
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(option === 'orders' ? 'orders' : 'detail');

  const [addressPage, setAddressPage] = useState('show');

  const [addressList, setAddressList] = useState([]);
  const [addressListFetched, setAddressListFetched] = useState(false);

  // Address Variables
  const [addressId, setAddressId] = useState();
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

  const [orderLoading, setOrderLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);

  const [my_first_name, setMyFirstName] = useState();
  const [my_last_name, setMyLastName] = useState();
  const [my_email, setMyEmail] = useState();
  const [edit_my_detail, setEditMyDetail] = useState(false);
  const [edit_my_password, setEditMyPassword] = useState(false);

  const [my_password_current, setMyPasswordCurrent] = useState();
  const [my_password, setMyPassword] = useState();
  const [my_password_confirm, setMyPasswordConfirm] = useState();

  // END address VAriables
  const getOrders = async () => {
    try {
      setPageLoading(true)
      // setOrderLoading(true);
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/orders`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        setOrderList(res.data);
        setPageLoading(false)
        // console.log('Orders', res.data);
      } else {
        setPageLoading(false)
        alert.error(res.message);
      }
    } catch (err) {
      alert.error(err);
      setPageLoading(false)
    }
    setOrderLoading(false);
  };

  const getMe = async () => {
    try {
      setPageLoading(false)
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/getme`,
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
        setLoading(false);
        setMyFirstName(res.data.first_name);
        setMyLastName(res.data.last_name);
        setMyEmail(res.data.email);
        setPageLoading(false)
        return;
      }
    } catch (err) {
      setPageLoading(false)
    }
    setLoading(false);
    navigate('/login');
  };

  const updateMyDetails = async () => {
    try {
      setPageLoading(true)
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/updateMe`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: my_first_name,
            last_name: my_last_name,
            email: my_email,
          }),
        }
      );
      const res = JSON.parse(await response.text());
      // alert(res.status);
      if (res.status === 'success') {
        setEditMyDetail(false);
        setPageLoading(false)
        alert.success('Details Updated');
      } else {
        setPageLoading(false)
        alert.error('Opss! Something went wrong. May be email is already there.');
        return;
      }
    } catch (err) { setPageLoading(false)}
    getMe();
  };

  const updateMyPassword = async () => {
    try {
      setPageLoading(true)
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/updateMyPassword`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            passwordCurrent: my_password_current,
            password: my_password,
            passwordConfirm: my_password_confirm,
          }),
        }
      );
      const res = JSON.parse(await response.text());
      // alert(res.status);
      if (res.status === 'success') {
        alert.success('Your password is Updated');
        setEditMyPassword(false);
        setMyPassword(null);
        setMyPasswordCurrent(null);
        setMyPasswordConfirm(null);
        setPageLoading(false)
      } else {
        alert.error(res.message);
        setPageLoading(false)
      }
    } catch (err) { setPageLoading(false)}
  };

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

  const addAddress = async () => {
    try {
      setPageLoading(true)
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
        alert.success(res.status);
        // setLoading(false);
        resetData();
        getAddress();
        setAddressPage('show');
        setPageLoading(false)
        return;
      } else {
        alert.error(res.message);
        setPageLoading(false)
      }
    } catch (err) {
      setPageLoading(false)
    }
    // setLoading(false);
    // navigate('/login');
  };

  const editAddress = async () => {
    try {
      setPageLoading(true)
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
        alert.success(res.status);
        // setLoading(false);
        resetData();
        getAddress();
        setAddressPage('show');
        setPageLoading(false)
        return;
      } else {
        alert.error(res.message);
        setPageLoading(false)
      }
    } catch (err) {
      // console.log(err);
      setPageLoading(false)
      alert.error('Something went wrong!');
    }
    // setLoading(false);
    // navigate('/login');
  };

  const deleteAddress = async (id) => {
    try {
      setPageLoading(true)
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
        alert.success('Deleted');
        getAddress();
        setPageLoading(false)
        return;
      }
      alert.error('Something went wrong! try again.');
    } catch (err) {
      // console.log(err);
      setPageLoading(false)
      alert.error('Something went wrong!');
    }
    // setLoading(false);
    // navigate('/login');
  };

  const getAddress = async () => {
    try {
      setPageLoading(true)
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
        setPageLoading(false)
      } else {
        alert.error(res.message);
        setPageLoading(false)
      }
    } catch (err) { setPageLoading(false)}
    setLoading(false);
    // navigate('/login');
  };
  const logout = async () => {
    try {
      setPageLoading(true)
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/logout`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = JSON.parse(await response.text());

      if (res.status === 'success') {
        setLoading(false);
        setPageLoading(false)
        alert.success("You have been logged out.")
        navigate('/');
        return;
      }
    } catch (err) { setPageLoading(false)}
    setLoading(false);
    navigate('/login');
  };
  if (loading) {
    getMe();
    return <></>;
  }

  function AddressSubmitButton() {
    if (addressPage === 'edit') {
      return (
        <Ripples>
          <button
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              editAddress();
            }}
          >
            UPDATE ADDRESS
          </button>
        </Ripples>
      );
    } else {
      return (
        <Ripples>
          <button
            style={{
              cursor: 'pointer',
            }}
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

  function MyDetail() {
    if (edit_my_detail) {
      return (
        <>
          <div className="my-account-main-display-heading">
            <p>My Details</p>
            <p
              style={{
                fontSize: 18,
                cursor: 'pointer',
              }}
              onClick={() => setEditMyDetail(false)}
            >
              Cancel
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '48% 4% 48%',
            }}
          >
            <div className="my-account-main-display-add-address-section-1-1">
              <label htmlFor="first_name">FIRST NAME</label>
              <br />
              <input
                id="first_name"
                type="text"
                value={my_first_name}
                onChange={(e) => setMyFirstName(e.target.value)}
              />
            </div>
            <div> </div>
            <div className="my-account-main-display-add-address-section-1-1">
              <label htmlFor="last_name">LAST NAME</label>
              <br />
              <input
                id="last_name"
                type="text"
                name="last_name"
                value={my_last_name}
                onChange={(e) => setMyLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="my-account-main-display-add-address-section-1-1">
            <label htmlFor="last_name">Email</label>
            <br />
            <input
              id="last_name"
              type="text"
              name="last_name"
              value={my_email}
              onChange={(e) => setMyEmail(e.target.value)}
            />
          </div>
          <div className="my-account-main-display-add-address-btn">
            <Ripples>
              <button
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  updateMyDetails();
                }}
              >
                UPDATE DETAILS
              </button>
            </Ripples>
          </div>
        </>
      );
    } else if (edit_my_password) {
      return (
        <>
          <div className="my-account-main-display-heading">
            <p>My Details</p>
            <p
              style={{
                fontSize: 18,
                cursor: 'pointer',
              }}
              onClick={() => setEditMyPassword(false)}
            >
              Cancel
            </p>
          </div>
          <div>
            <div className="my-account-main-display-add-address-section-1-1">
              <label htmlFor="first_name">CURRENT PASSWORD</label>
              <br />
              <input
                id="first_name"
                type="password"
                value={my_password_current}
                onChange={(e) => setMyPasswordCurrent(e.target.value)}
              />
            </div>
            <div> </div>
            <div className="my-account-main-display-add-address-section-1-1">
              <label htmlFor="last_name">NEW PASSWORD</label>
              <br />
              <input
                id="last_name"
                type="password"
                name="last_name"
                value={my_password}
                onChange={(e) => setMyPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="my-account-main-display-add-address-section-1-1">
            <label htmlFor="last_name">CONFIRM PASSWORD</label>
            <br />
            <input
              id="last_name"
              type="password"
              name="last_name"
              value={my_password_confirm}
              onChange={(e) => setMyPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="my-account-main-display-add-address-btn">
            <Ripples>
              <button
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  updateMyPassword();
                }}
              >
                UPDATE PASSWORD
              </button>
            </Ripples>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="my-account-main-display-heading">
          <p>My Details</p>
          <div>
            <div>
              <p
                style={{
                  fontSize: 'small',
                }}
              >
                Edit Detail
              </p>
              <EditIcon
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => setEditMyDetail(true)}
              />
            </div>
            <div>
              <p
                style={{
                  fontSize: 'small',
                }}
              >
                Change Password
              </p>
              <EditIcon
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => setEditMyPassword(true)}
              />
            </div>
          </div>
        </div>
        <div
          style={{ padding: '0.4rem' }}
          className="my-account-main-display-mydetaiils"
        >
          <p>
            Name {my_first_name} {my_last_name}
          </p>
          <p>Email:- {my_email}</p>
        </div>
      </>
    );
  }
  function MyAddresses() {
    if (addressPage === 'show') {
      if (!addressListFetched) {
        getAddress();
        return <p>Loading...</p>;
      }
      return (
        <>
          <div className="my-account-main-display-heading">
            <p>My Addresses</p>
            <p
              style={{
                fontSize: 18,
                cursor: 'pointer',
              }}
              onClick={() => setAddressPage('add')}
            >
              Add
            </p>
          </div>
          {addressList.map((address, index) => (
            <div className="my-account-main-display-addresses" key={index}>
              <div>
                {address.defaultAddress ? <p>Default Address </p> : ''}
                <br />
                <p>
                  {address.first_name} {address.last_name}
                </p>
                <p>
                  {address.address_1} {address.address_2}
                </p>
                <p>
                  {address.postal_zip_code} {address.city} {address.province}
                </p>
                <p>{address.country}</p>
              </div>
              <div>
                <EditIcon
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setData(address);
                    setAddressPage('edit');
                  }}
                />
                <DeleteForeverIcon
                  style={{ cursor: 'pointer' }}
                  onClick={() => deleteAddress(address._id)}
                />
              </div>
            </div>
          ))}
        </>
      );
    } else if (addressPage === 'add' || addressPage === 'edit') {
      return (
        <>
          <div className="my-account-main-display-heading">
            <p>My Addresses</p>
            <p
              style={{
                fontSize: 18,
                cursor: 'pointer',
              }}
              onClick={() => setAddressPage('show')}
            >
              Cancel
            </p>
          </div>
          <div className="my-account-main-display-add-address">
            <div className="my-account-main-display-add-address-section-1">
              <div className="my-account-main-display-add-address-section-1-1">
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
              <div className="my-account-main-display-add-address-section-1-1">
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
            <div className="my-account-main-display-add-address-section-2">
              <label htmlFor="address_1">ADDRESS 1</label>
              <br />
              <input
                id="address_1"
                type="text"
                value={address_1}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </div>
            <div className="my-account-main-display-add-address-section-2">
              <label htmlFor="address_2">ADDRESS 2</label>
              <br />
              <input
                id="address_2"
                type="text"
                value={address_2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>

            <div className="my-account-main-display-add-address-section-2">
              <label htmlFor="city">CITY</label>
              <br />
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="my-account-main-display-add-address-section-2">
              <label htmlFor="country">COUNTRY</label>
              <br />
              <input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="my-account-main-display-add-address-section-2">
              <label htmlFor="province">PROVINCE</label>
              <br />
              <input
                id="province"
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>

            <div className="my-account-main-display-add-address-section-1">
              <div className="my-account-main-display-add-address-section-1-1">
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
              <div className="my-account-main-display-add-address-section-1-1">
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

            <div className="my-account-main-display-add-address-setdefault">
              <label htmlFor="set_default">SET AS DEFAULT</label>
              <br />
              <input
                style={{
                  width: 20,
                  cursor: 'pointer',
                }}
                id="set_default"
                type="checkbox"
                checked={defaultAddress}
                onChange={() => setDefaultAddress(!defaultAddress)}
              />
            </div>
            <br />
            <div className="my-account-main-display-add-address-btn">
              <AddressSubmitButton />
            </div>
          </div>
        </>
      );
    }
  }
  function MyOrders() {
    function getDate(date) {
      // let d = new Date(date).toLocaleString();
      // let time = new Date(date).toLocaleDateString();

      let d = new Date(date).toDateString();
      let time = new Date(date).toLocaleTimeString();

      return d + ' ' + time;
    }
    if (orderLoading) {
      getOrders();
      return <p>Loading...</p>;
    }
    return (
      <>
        <div className="myaccount-myorders-div">
          {orderList.map((order, index) => (
            <>
              <div key={index} className="myaccount-myorders-status">
                <p>Order Date: {getDate(order.ordered_at)}</p>
                <p>Status: {order.status}</p>
              </div>
              <div className="myaccount-myorders-shipping">
                <p>
                  <b>Shipping Address</b>
                </p>
                <p>
                  {order.address.first_name} {order.address.last_name}
                </p>
                <p>
                  {order.address.address_1} {order.address.address_2}
                </p>
                <p>{order.address.city}</p>
                <p>
                  {order.address.postal_zip_code} {order.address.province}{' '}
                  {order.address.country}
                </p>
                <p>{order.address.phone}</p>
              </div>
              {order.products.map((product, index) => (
                <div className="myaccount-myorders-products" key={index}>
                  <div className="myaccount-myorders-product-img">
                    <img src={`/images/${product.image}`} alt="" />
                  </div>
                  <div className="myaccount-myorders-product-detail">
                    <p>{product.name}</p>
                    <p>
                      Quantity:- <b>{product.quantity}</b>
                    </p>
                    <p>
                      <b>
                        {order.total_cost.currency}{' '}
                        {product.price * product.quantity}
                      </b>
                    </p>
                  </div>
                  <div className="myaccount-myorders-product-status">
                    <p>{product.status}</p>
                  </div>
                </div>
              ))}
            </>
          ))}
        </div>
      </>
    );
  }
  // function AccountSetting() {
  //   return (
  //     <div className="my-account-main-display-heading">
  //       <p>Account Setting</p>
  //     </div>
  //   );
  // }

  function MyAccountDisplay() {
    if (page === 'addresses') {
      return MyAddresses();
    } else if (page === 'orders') {
      return (
        <>
          <div className="my-account-main-display-heading">
            <p>My Order</p>
          </div>
          {MyOrders()}
        </>
      );
    } else {
      return MyDetail();
    }
    // else if (page === 'setting') {
    //   return <AccountSetting />;
    // }
  }

  return (
    <>
      <div className="my-account-div">
        <div className="my-account-heading">
          <span>My Account</span>
        </div>
        <div className="my-account-main">
          <div className="my-account-main-options">
            <Ripples
              style={{
                marginTop: 5,
                marginBotton: 5,
              }}
            >
              <button
                style={{
                  border: 1,
                  marginTop: 5,
                  marginBotton: 5,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setPage('detail');
                  executeScroll();
                }}
              >
                <AccountCircleOutlinedIcon
                  style={{
                    marginRight: 10,
                  }}
                />
                My Details
              </button>
            </Ripples>
            <Ripples>
              <button
                style={{
                  marginTop: 5,
                  marginBotton: 5,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setPage('addresses');
                  executeScroll();
                }}
              >
                <AddLocationOutlinedIcon
                  style={{
                    marginRight: 10,
                  }}
                />
                My addresses
              </button>
            </Ripples>
            <Ripples>
              <button
                style={{
                  marginTop: 5,
                  marginBotton: 5,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setPage('orders');
                  executeScroll();
                }}
              >
                <ShoppingBagOutlinedIcon
                  style={{
                    marginRight: 10,
                  }}
                />
                My Orders
              </button>
            </Ripples>
            {/* <Ripples>
              <button
                style={{
                  marginTop: 5,
                  marginBotton: 5,
                }}
                onClick={() => {
                  setPage('setting');
                  executeScroll();
                }}
              >
                <SettingsApplicationsOutlinedIcon
                  style={{
                    marginRight: 10,
                  }}
                />
                Account settings
              </button>
            </Ripples> */}
            <Ripples>
              <button
                style={{
                  marginTop: 5,
                  marginBotton: 5,
                  cursor: 'pointer',
                }}
                onClick={() => logout()}
              >
                <LogoutIcon
                  style={{
                    marginRight: 10,
                  }}
                />
                Logout
              </button>
            </Ripples>
          </div>
          <div ref={myRef} className="my-account-main-display">
            {MyAccountDisplay()}
          </div>
        </div>
        <div style={{
        width: "100%",
        height: "70vh"
      }}>

      </div>
      </div>
      
    </>
  );
}
