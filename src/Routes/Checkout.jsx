import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { clearCart } from "./../Redux/createSlice";
import { useTranslation } from "react-i18next"
function Checkout() {
const {t , i18n} = useTranslation()
const dispatch = useDispatch();

const navigate = useNavigate();
 const [error, setError] = useState("");
 const [loading,setLoading]=useState(false);
  const cartData = useSelector((state) => state.counter.cartData); 
  const totalPrice = cartData.reduce((acc , item) =>{
    return acc + item.price * item.quantity
  } , 0)
  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  address: "",
  paymentMethod: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

};
const shipping = 200;
const finalPrice = totalPrice + shipping;


const handlePayment = async () => {
  try {
    if (cartData.length === 0) {
  return setError("Your cart is empty.");
}
    setLoading(true);

    const res = await fetch("https://ecommerce-vite-fgou.vercel.app/api/order", {
      method: "POST",
       credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        products: cartData,
        finalPrice,
      }),
    });

    const data = await res.json();
    
if (res.status === 401) {
  setError("Please login before placing your order.");
  setTimeout(() => {
    navigate("/login");
  }, 3000);
  return;
}
    if (!res.ok) {
      setError(data.message);
      return;
    }

    const publicKey = import.meta.env.VITE_PAYMOB_PUBLIC_KEY;

    const url = `https://accept.paymob.com/unifiedcheckout/?publicKey=${publicKey}&clientSecret=${data.client_secret}`;
    dispatch(clearCart());
    window.location.href = url;
 
  } catch (err) {
    console.error("Error:", err);
    setError("Something went wrong");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="checkout">
      <div className="checkout-left">
        <h2>{t("Billing Details")}</h2>
      {error && <p className='error'>{error}</p>}
      <input
  type="text"
  name="firstName"
  value={formData.firstName}
  onChange={handleChange}
    placeholder={t("FirstName")}
/>

<input
  type="text"
  name="lastName"
  value={formData.lastName}
  onChange={handleChange}
    placeholder={t("LastName")}
/>

<input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder={t("Email")}
/>

<input
  type="text"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
    placeholder={t("Phone")}
/>

<input
  type="text"
  name="country"
  value={formData.country}
  onChange={handleChange}
    placeholder={t("Country")}
/>

<input
  type="text"
  name="city"
  value={formData.city}
  onChange={handleChange}
    placeholder= {t("City")}
/>
    <input
  type="text"
  name="address"
  value={formData.address}
  onChange={handleChange}
  placeholder={t("Address")}
/>
<select
    name="paymentMethod"
    value={formData.paymentMethod}
    onChange={handleChange}
>
    <option value=""> {t("Choose Payment")}</option>
    <option value="card"> {t("Card")}</option>
    <option value="wallet"> {t("Wallet")}</option>
</select>
<div className="heelpprice">
  <p>{t("Subtotal")}: {totalPrice.toFixed(2)} EGP</p>

  <p>{t("Shipping")}: {shipping} EGP</p>

  <h3>{t("Total")}: {finalPrice.toFixed(2)} EGP</h3>
</div>

<button onClick={handlePayment} disabled={loading}>
  {loading ? t("Loading...") : t("Place Order")}
</button>
            
      </div>
    </div>
  );
}

export default Checkout