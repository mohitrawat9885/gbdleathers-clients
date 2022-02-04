import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ripples from 'react-ripples';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddLocationOutlinedIcon from '@mui/icons-material/AddLocationOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './MyAccount.css';
import { Phone } from '@mui/icons-material';
export default function MyAccount() {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('detail');
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

  // END address VAriables

  const getMe = async () => {
    try {
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
        return;
      }
    } catch (err) {}
    setLoading(false);
    navigate('/login');
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
        alert(res.status);
        // setLoading(false);
        resetData();
        getAddress();
        setAddressPage('show');
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
        alert(res.status);
        // setLoading(false);
        resetData();
        getAddress();
        setAddressPage('show');

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
        alert('Deleted');
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
        console.log(res.data);
      } else {
        alert(res.message);
      }
    } catch (err) {}
    setLoading(false);
    // navigate('/login');
  };
  const logout = async () => {
    try {
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
        navigate('/');
        return;
      }
    } catch (err) {}
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
    return (
      <div className="my-account-main-display-heading">
        <p>My Details</p>
      </div>
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
                  onClick={() => {
                    setData(address);
                    setAddressPage('edit');
                  }}
                />
                <DeleteForeverIcon onClick={() => deleteAddress(address._id)} />
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
    return (
      <div className="my-account-main-display-heading">
        <p>My Order</p>
      </div>
    );
  }
  function AccountSetting() {
    return (
      <div className="my-account-main-display-heading">
        <p>Account Setting</p>
      </div>
    );
  }

  function MyAccountDisplay() {
    if (page === 'detail') {
      return MyDetail();
    } else if (page === 'addresses') {
      return MyAddresses();
    } else if (page === 'orders') {
      return MyOrders();
    } else if (page === 'setting') {
      return <AccountSetting />;
    }
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
                }}
                onClick={() => setPage('detail')}
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
                }}
                onClick={() => setPage('addresses')}
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
                }}
                onClick={() => setPage('orders')}
              >
                <ShoppingBagOutlinedIcon
                  style={{
                    marginRight: 10,
                  }}
                />
                My Orders
              </button>
            </Ripples>
            <Ripples>
              <button
                style={{
                  marginTop: 5,
                  marginBotton: 5,
                }}
                onClick={() => setPage('setting')}
              >
                <SettingsApplicationsOutlinedIcon
                  style={{
                    marginRight: 10,
                  }}
                />
                Account settings
              </button>
            </Ripples>
            <Ripples>
              <button
                style={{
                  marginTop: 5,
                  marginBotton: 5,
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
          <div className="my-account-main-display">{MyAccountDisplay()}</div>
        </div>
      </div>
    </>
  );
}
