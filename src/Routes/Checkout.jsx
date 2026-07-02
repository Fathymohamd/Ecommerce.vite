import React from 'react'
import {useState} from "react"
import { useSelector } from "react-redux";

function Checkout() {
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
  return (
    <div className="checkout">
      <div className="checkout-left">
        <h2>Billing Details</h2>

        <input type="text" value={formData} onChange={(e)=> setFormData(e.trate.value)} name='First_Name' placeholder="First Name" />
        <input type="text" name='Last_Name' placeholder="Last Name" />
        <input type="email" name='Email' placeholder="Email" />
        <input type="text" name='Phone' placeholder="Phone" />
        <input type="text" name='Country' placeholder="Country" />
        <input type="text" name='City' placeholder="City" />
        <textarea placeholder="Address" name='Address'></textarea>
        
         <div className="heelpprice">
                <p>${totalPrice.toFixed(2)}</p>
            </div>
            <button>Place Order</button>
      </div>
    </div>
  );
}

export default Checkout